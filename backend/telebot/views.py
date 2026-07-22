from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Conversation, Message
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    ConversationSerializer,
    MessageSerializer,
    CreateMessageSerializer,
)


# ==========================================
# AUTH APIs
# ==========================================

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    print(f"{request.data}")
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password,
    )

    if not user:
        return Response(
            {"detail": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "user": UserSerializer(user).data,
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# ==========================================
# CONVERSATION APIs
# ==========================================

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def conversations(request):

    if request.method == "GET":

        chats = Conversation.objects.filter(
            user=request.user
        )

        serializer = ConversationSerializer(
            chats,
            many=True,
        )

        return Response(serializer.data)

    serializer = ConversationSerializer(data=request.data)

    if serializer.is_valid():

        conversation = serializer.save(
            user=request.user
        )

        return Response(
            ConversationSerializer(conversation).data,
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["GET", "DELETE"])
@permission_classes([IsAuthenticated])
def conversation_detail(request, pk):

    try:
        conversation = Conversation.objects.get(
            id=pk,
            user=request.user,
        )
    except Conversation.DoesNotExist:
        return Response(
            {"detail": "Conversation not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data)

    conversation.delete()

    return Response(
        {"message": "Conversation deleted"},
        status=status.HTTP_204_NO_CONTENT,
    )


# ==========================================
# MESSAGE APIs
# ==========================================

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def messages(request, pk):

    try:
        conversation = Conversation.objects.get(
            id=pk,
            user=request.user,
        )
    except Conversation.DoesNotExist:
        return Response(
            {"detail": "Conversation not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":

        msgs = conversation.messages.all()

        serializer = MessageSerializer(
            msgs,
            many=True,
        )

        return Response(serializer.data)

    serializer = CreateMessageSerializer(
        data=request.data
    )

    serializer.is_valid(raise_exception=True)

    text = serializer.validated_data["message"]

    user_message = Message.objects.create(
        conversation=conversation,
        sender=Message.USER,
        message=text,
    )

    # Update conversation title from first message
    if (
        conversation.title == "New Chat"
        and conversation.messages.filter(
            sender=Message.USER
        ).count() == 1
    ):
        conversation.title = text[:60]
        conversation.save()

    return Response(
        MessageSerializer(user_message).data,
        status=status.HTTP_201_CREATED,
    )

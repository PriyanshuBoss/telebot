from django.urls import path
from . import views

urlpatterns = [

    # Authentication
    path("register/", views.register),
    path("login/", views.login),
    path("profile/", views.profile),

    # Conversations
    path("conversations/", views.conversations),
    path("conversations/<int:pk>/", views.conversation_detail),

    # Messages
    path(
        "conversations/<int:pk>/messages/",
        views.messages,
    ),
]

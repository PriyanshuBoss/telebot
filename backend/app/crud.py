from sqlalchemy.orm import Session

from app.models import User, Conversation, Message
from app.core.security import hash_password, verify_password


# ==========================================================
# User CRUD
# ==========================================================

def get_user_by_username(
    db: Session,
    username: str,
):
    return (
        db.query(User)
        .filter(User.username == username)
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: int,
):
    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def create_user(
    db: Session,
    username: str,
    password: str,
):
    user = User(
        username=username,
        password_hash=hash_password(password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    username: str,
    password: str,
):
    user = get_user_by_username(db, username)

    if user is None:
        return None

    if not verify_password(password, user.password_hash):
        return None

    return user


# ==========================================================
# Conversation CRUD
# ==========================================================

def create_conversation(
    db: Session,
    user_id: int,
    title: str = "New Chat",
):
    conversation = Conversation(
        user_id=user_id,
        title=title,
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def get_conversations(
    db: Session,
    user_id: int,
):
    return (
        db.query(Conversation)
        .filter(Conversation.user_id == user_id)
        .order_by(Conversation.created_at.desc())
        .all()
    )


def get_conversation(
    db: Session,
    conversation_id: int,
    user_id: int,
):
    return (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id,
        )
        .first()
    )


def update_conversation_title(
    db: Session,
    conversation: Conversation,
    title: str,
):
    conversation.title = title

    db.commit()
    db.refresh(conversation)

    return conversation


def delete_conversation(
    db: Session,
    conversation: Conversation,
):
    db.delete(conversation)
    db.commit()


# ==========================================================
# Message CRUD
# ==========================================================

def create_message(
    db: Session,
    conversation_id: int,
    sender: str,
    message: str,
):
    msg = Message(
        conversation_id=conversation_id,
        sender=sender,
        message=message,
    )

    db.add(msg)

    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )

    if (
        conversation
        and conversation.title == "New Chat"
        and sender.lower() == "user"
    ):
        conversation.title = message[:40]

    db.commit()
    db.refresh(msg)

    return msg


def get_messages(
    db: Session,
    conversation_id: int,
):
    return (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id
        )
        .order_by(Message.created_at.asc())
        .all()
    )


def delete_message(
    db: Session,
    message_id: int,
):
    message = (
        db.query(Message)
        .filter(Message.id == message_id)
        .first()
    )

    if message:
        db.delete(message)
        db.commit()

    return message
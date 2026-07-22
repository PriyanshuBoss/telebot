from sqlalchemy.orm import Session

from app.models import Conversation, Message


def create_conversation(db: Session, title="New Chat"):
    conversation = Conversation(title=title)

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def get_conversations(db: Session):
    return (
        db.query(Conversation)
        .order_by(Conversation.created_at.desc())
        .all()
    )


def create_message(db, conversation_id, sender, message):
    msg = Message(
        conversation_id=conversation_id,
        sender=sender,
        message=message,
    )

    db.add(msg)
    db.commit()
    db.refresh(msg)

    # Update title if it's still "New Chat"
    conversation = (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id)
        .first()
    )

    if (
        conversation
        and conversation.title == "New Chat"
        and sender == "user"
    ):
        conversation.title = message[:40]
        db.commit()

    return msg



def get_messages(db: Session, conversation_id):
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at)
        .all()
    )

def update_conversation_title(db, conversation_id, title):
    conversation = (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id)
        .first()
    )

    if conversation:
        conversation.title = title
        db.commit()
        db.refresh(conversation)

    return conversation
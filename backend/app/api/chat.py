from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import (
    ConversationCreate,
    MessageCreate,
)

from app import crud

router = APIRouter(tags=["Chat"])


@router.post("/conversations")
def create_conversation(
    body: ConversationCreate,
    db: Session = Depends(get_db),
):
    return crud.create_conversation(
        db,
        body.title,
    )


@router.get("/conversations")
def get_conversations(
    db: Session = Depends(get_db),
):
    return crud.get_conversations(db)


@router.get("/conversations/{conversation_id}/messages")
def get_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
):
    return crud.get_messages(
        db,
        conversation_id,
    )


@router.post("/conversations/{conversation_id}/messages")
def create_message(
    conversation_id: int,
    body: MessageCreate,
    db: Session = Depends(get_db),
):
    return crud.create_message(
        db,
        conversation_id,
        body.sender,
        body.message,
    )
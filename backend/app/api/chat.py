from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.dependencies import get_current_user
from app.models import User
from app.schemas import (
    ConversationCreate,
    ConversationResponse,
    MessageCreate,
    MessageResponse,
)

router = APIRouter(tags=["Chat"])


# ==========================================================
# Conversations
# ==========================================================

@router.post(
    "/conversations",
    response_model=ConversationResponse,
)
def create_conversation(
    body: ConversationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return crud.create_conversation(
        db=db,
        user_id=current_user.id,
        title=body.title,
    )


@router.get(
    "/conversations",
    response_model=list[ConversationResponse],
)
def get_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return crud.get_conversations(
        db=db,
        user_id=current_user.id,
    )


# ==========================================================
# Messages
# ==========================================================

@router.get(
    "/conversations/{conversation_id}/messages",
    response_model=list[MessageResponse],
)
def get_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = crud.get_conversation(
        db=db,
        conversation_id=conversation_id,
        user_id=current_user.id,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return crud.get_messages(
        db=db,
        conversation_id=conversation_id,
    )


@router.post(
    "/conversations/{conversation_id}/messages",
    response_model=MessageResponse,
)
def create_message(
    conversation_id: int,
    body: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = crud.get_conversation(
        db=db,
        conversation_id=conversation_id,
        user_id=current_user.id,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return crud.create_message(
        db=db,
        conversation_id=conversation_id,
        sender=body.sender,
        message=body.message,
    )

from pydantic import BaseModel
from datetime import datetime


class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class ConversationCreate(BaseModel):
    title: str = "New Chat"


class ConversationResponse(BaseModel):
    id: int
    title: str
    created_at: datetime

    class Config:
        from_attributes = True


class MessageCreate(BaseModel):
    sender: str
    message: str


class MessageResponse(BaseModel):
    id: int
    conversation_id: int
    sender: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

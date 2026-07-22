from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import (
    UserCreate,
    UserLogin,
    UserResponse,
    Token,
)
from app.crud import (
    create_user,
    authenticate_user,
    get_user_by_username,
)
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    existing = get_user_by_username(
        db,
        user.username,
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Username already exists",
        )

    return create_user(
        db,
        user.username,
        user.password,
    )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    db_user = authenticate_user(
        db,
        user.username,
        user.password,
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )

    token = create_access_token(
        {"sub": db_user.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import engine, Base
from app.models import Message
from app.api.chat import router as chat_router
from app.admin import setup_admin


# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TeleBot API")

setup_admin(app)

# Enable React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register chat routes
app.include_router(chat_router)


@app.get("/")
def home():
    with engine.connect() as conn:
        version = conn.execute(text("SELECT version();"))
        return {"postgres": version.scalar()}

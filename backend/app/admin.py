from sqladmin import Admin, ModelView

from app.database import engine
from app.models import Conversation, Message


def setup_admin(app):
    admin = Admin(app, engine)

    class ConversationAdmin(ModelView, model=Conversation):
        column_list = [
            Conversation.id,
            Conversation.title,
            Conversation.created_at,
        ]

    class MessageAdmin(ModelView, model=Message):
        column_list = [
            Message.id,
            Message.conversation_id,
            Message.sender,
            Message.message,
            Message.created_at,
        ]

    admin.add_view(ConversationAdmin)
    admin.add_view(MessageAdmin)

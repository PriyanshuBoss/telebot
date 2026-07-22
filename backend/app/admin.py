from sqladmin import Admin, ModelView

from app.database import engine
from app.models import User, Conversation, Message


def setup_admin(app):
    admin = Admin(app, engine)

    class UserAdmin(ModelView, model=User):
        name = "User"
        name_plural = "Users"

        column_list = [
            User.id,
            User.username,
            User.created_at,
        ]

        column_searchable_list = [
            User.username,
        ]

        column_sortable_list = [
            User.id,
            User.username,
            User.created_at,
        ]

    class ConversationAdmin(ModelView, model=Conversation):
        name = "Conversation"
        name_plural = "Conversations"

        column_list = [
            Conversation.id,
            Conversation.user_id,
            Conversation.title,
            Conversation.created_at,
        ]

        column_searchable_list = [
            Conversation.title,
        ]

        column_sortable_list = [
            Conversation.id,
            Conversation.user_id,
            Conversation.created_at,
        ]

    class MessageAdmin(ModelView, model=Message):
        name = "Message"
        name_plural = "Messages"

        column_list = [
            Message.id,
            Message.conversation_id,
            Message.sender,
            Message.message,
            Message.created_at,
        ]

        column_searchable_list = [
            Message.sender,
            Message.message,
        ]

        column_sortable_list = [
            Message.id,
            Message.conversation_id,
            Message.created_at,
        ]

    admin.add_view(UserAdmin)
    admin.add_view(ConversationAdmin)
    admin.add_view(MessageAdmin)
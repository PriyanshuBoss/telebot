export default function Sidebar({
    conversations,
    currentConversation,
    onSelect,
    onNewChat,
    onLogout
  }) {
    return (
      <div className="w-72 bg-slate-900 text-white flex flex-col">
  
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <button
            onClick={onNewChat}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium transition"
          >
            + New Chat
          </button>
        </div>
  
        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {conversations.length === 0 ? (
            <p className="text-slate-400 text-sm text-center mt-4">
              No conversations yet
            </p>
          ) : (
            conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelect(chat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  currentConversation === chat.id
                    ? "bg-slate-700"
                    : "hover:bg-slate-800"
                }`}
              >
                {chat.title}
              </button>
            ))
          )}
        </div>
  
        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>
  
      </div>
    );
  }
  
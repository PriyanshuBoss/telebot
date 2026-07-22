export default function Sidebar({
    conversations,
    currentConversation,
    onSelect,
    onNewChat,
  }) {
    return (
      <div className="w-72 bg-slate-900 text-white flex flex-col">
  
        <div className="text-2xl font-bold p-6">
          🤖 TeleBot
        </div>
  
        <div className="px-4">
          <button
            onClick={onNewChat}
            className="w-full bg-blue-600 rounded-xl py-3 hover:bg-blue-700"
          >
            + New Chat
          </button>
        </div>
  
        <div className="mt-6 overflow-y-auto">
  
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={`cursor-pointer px-5 py-4 hover:bg-slate-800 ${
                currentConversation === chat.id
                  ? "bg-slate-800"
                  : ""
              }`}
            >
              {chat.title}
            </div>
          ))}
  
        </div>
      </div>
    );
  }
export default function ChatWindow({ messages }) {
    if (messages.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center">
  
          <div className="text-center">
  
            <h1 className="text-5xl font-bold">
  
              🤖 TeleBot
  
            </h1>
  
            <p className="mt-4 text-gray-500">
  
              How can I help you today?
  
            </p>
  
          </div>
  
        </div>
      );
    }
  
    return (
      <div className="flex-1 overflow-y-auto p-6">
  
        <div className="max-w-4xl mx-auto space-y-5">
  
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl px-5 py-3 max-w-xl ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
  
        </div>
  
      </div>
    );
  }
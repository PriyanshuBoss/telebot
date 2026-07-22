export default function ChatWindow({ messages }) {

    if (messages.length === 0) {
      return (
  
        <div className="flex-1 flex items-center justify-center">
  
          <div className="text-center">
  
            <h1 className="text-5xl font-bold text-slate-700">
  
              🤖 TeleBot
  
            </h1>
  
            <p className="text-slate-500 mt-4">
  
              How can I help you today?
  
            </p>
  
          </div>
  
        </div>
  
      );
    }
  
    return (
  
      <div className="flex-1 overflow-y-auto p-8">
  
        <div className="max-w-4xl mx-auto space-y-6">
  
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
                className={`max-w-xl rounded-2xl px-5 py-3 ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {msg.text}
              </div>
  
            </div>
  
          ))}
  
        </div>
  
      </div>
  
    );
  
  }
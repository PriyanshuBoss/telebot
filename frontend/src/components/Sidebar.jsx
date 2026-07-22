export default function Sidebar() {

    return (
  
      <div className="w-72 bg-slate-900 text-white flex flex-col">
  
        <div className="text-2xl font-bold p-6">
  
          🤖 TeleBot
  
        </div>
  
        <div className="px-4">
  
          <button className="w-full rounded-xl bg-blue-600 py-3 hover:bg-blue-700">
  
            + New Chat
  
          </button>
  
        </div>
  
        <div className="mt-8 px-4">
  
          <p className="text-slate-400 text-sm mb-3">
  
            Recent Chats
  
          </p>
  
          <div className="space-y-2">
  
            <div className="rounded-lg p-3 hover:bg-slate-800 cursor-pointer">
  
              Hello Bot
  
            </div>
  
            <div className="rounded-lg p-3 hover:bg-slate-800 cursor-pointer">
  
              AI Project
  
            </div>
  
          </div>
  
        </div>
  
      </div>
  
    );
  
  }

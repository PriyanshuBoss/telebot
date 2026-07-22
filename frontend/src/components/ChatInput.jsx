import { useState } from "react";

export default function ChatInput({ onSend }) {

  const [text, setText] = useState("");

  const send = () => {

    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (

    <div className="p-6">

      <div className="max-w-4xl mx-auto flex gap-3">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask anything..."
        />

        <button
          onClick={send}
          className="bg-blue-600 text-white px-8 rounded-2xl hover:bg-blue-700"
        >
          Send
        </button>

      </div>

    </div>

  );

}
import React, { useRef, useEffect } from "react";

const ChatArea = ({ chatHistory, askQuestion }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="flex-1 mb-4 sm:mb-8 p-[2px] rounded-2xl bg-gradient-to-r from-pink-700 to-violet-700 overflow-hidden">
      <div className="h-[60vh] sm:h-[70vh] overflow-y-auto bg-zinc-950 rounded-2xl p-4 sm:p-6 flex flex-col space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`my-2 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.type === "user" && (
              <div className="max-w-[70%] px-4 py-3 text-left rounded-2xl bg-blue-600 text-white break-words rounded-br-none">
                {msg.text}
              </div>
            )}

            {msg.type === "bot" && msg.messageType === "Statement" && (
              <div className="max-w-[70%] px-4 py-3 text-left rounded-2xl bg-zinc-700 text-gray-100 break-words rounded-bl-none">
                {msg.text}
              </div>
            )}

            {msg.type === "bot" && msg.messageType === "Card" && (
              <div className="p-4 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-md text-left max-w-[90%] sm:max-w-lg">
                <h3 className="mb-2 text-base sm:text-lg font-bold text-white">{msg.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(msg.options) && msg.options.length > 0 ? (
                    msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => askQuestion(opt.displayName || opt.name || opt)}
                        className="px-3 py-2 sm:px-4 sm:py-2 text-white text-sm sm:text-base bg-gradient-to-r from-pink-700 to-violet-700 rounded-lg hover:opacity-90 focus:outline-none"
                      >
                        {opt.displayName || opt.name || opt}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No options available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;

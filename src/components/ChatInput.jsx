import React from "react";

const ChatInput = ({ question, setQuestion, askQuestion }) => {
  return (
    <div className="w-full sm:w-3/4 md:w-1/2 mx-auto mt-4 p-[2px] rounded-full bg-gradient-to-r from-pink-700 to-violet-700">
      <div className="flex h-12 sm:h-14 bg-zinc-800 rounded-full">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full h-full p-3 outline-none text-white bg-transparent rounded-l-full text-sm sm:text-base"
          placeholder="Ask me anything..."
          onKeyDown={(e) => e.key === "Enter" && askQuestion()}
        />
        <button
          onClick={() => askQuestion()}
          className="px-4 sm:px-6 rounded-r-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

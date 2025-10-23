import React from "react";

const Sidebar = ({ sampleQuestions, askQuestion, setSidebarOpen }) => {
  return (
    <div className="bg-zinc-800 p-5 flex flex-col justify-between md:col-span-1 md:static fixed inset-y-0 left-0 w-3/4 sm:w-1/2 md:w-auto transform transition-transform duration-300 z-40 md:translate-x-0">
      <div className="flex justify-between items-center md:block">
        <h2 className="text-xl font-bold mb-4">Chatbot</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="overflow-y-auto flex-1 mt-4 md:mt-0 space-y-2">
        <h3 className="text-gray-300 text-sm mb-2">Try asking:</h3>
        {sampleQuestions.map((q, index) => (
          <button
            key={index}
            onClick={() => {
              askQuestion(q);
              setSidebarOpen(false);
            }}
            className="w-full text-left bg-zinc-700 hover:bg-zinc-600 text-white text-sm py-2 px-3 rounded-lg transition-all duration-200"
          >
            {q.charAt(0).toUpperCase() + q.slice(1)}
          </button>
        ))}
      </div>

      <p className="text-gray-400 text-xs mt-5">&copy; Accenture Pvt Ltd</p>
    </div>
  );
};

export default Sidebar;

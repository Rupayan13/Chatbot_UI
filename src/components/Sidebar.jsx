import React from "react";

const Sidebar = ({ sampleQuestions, setQuestion }) => {
    return (
        <div className="col-span-1 bg-zinc-800 p-5 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold mb-4">Chatbot</h2>
                <h3 className="text-gray-300 text-sm mb-2">Try asking:</h3>
                <div className="flex flex-col space-y-2">
                    {sampleQuestions.map((q, index) => (
                        <button
                            key={index}
                            onClick={() => setQuestion(q)}
                            className="text-left bg-zinc-700 hover:bg-zinc-600 text-white text-sm py-2 px-3 rounded-lg transition-all duration-200"
                        >
                            {q.charAt(0).toUpperCase() + q.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            <p className="text-gray-400 text-sm mt-5">&copy; Accenture Pvt Ltd</p>
        </div>
    );
};

export default Sidebar;

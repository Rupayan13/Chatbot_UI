import React, { useRef, useEffect } from "react";

const ChatArea = ({ chatHistory, askQuestion }) => {
    const chatEndRef = useRef(null);

    // Auto-scroll when a new message is added
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    return (
        <div className="flex-1 mb-8 p-[2px] rounded-2xl bg-gradient-to-r from-pink-700 to-violet-700">
            <div className="h-full overflow-y-auto bg-zinc-950 rounded-2xl p-6 flex flex-col space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
                {chatHistory.length === 0 && (
                    <p className="text-gray-500 text-center mt-10">
                        Start asking a question...
                    </p>
                )}

                {chatHistory.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {/* User message */}
                        {msg.type === "user" && (
                            <div className="max-w-[70%] px-4 py-3 text-left rounded-2xl bg-blue-600 text-white break-words rounded-br-none">
                                {msg.text}
                            </div>
                        )}

                        {/* Bot statement */}
                        {msg.type === "bot" && msg.messageType === "Statement" && (
                            <div className="max-w-[70%] px-4 py-3 text-left rounded-2xl bg-zinc-700 text-gray-100 break-words rounded-bl-none">
                                {msg.text}
                            </div>
                        )}

                        {/* Bot card with clickable options */}
                        {msg.type === "bot" && msg.messageType === "Card" && (
                            <div className="max-w-sm p-4 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-md text-left">
                                <h5 className="mb-2 text-lg font-bold text-white">{msg.title}</h5>
                                <div className="flex flex-col space-y-2">
                                    {msg.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => askQuestion(option)}
                                            className="px-4 py-2 text-white bg-gradient-to-r from-pink-700 to-violet-700 rounded-lg hover:opacity-90 focus:outline-none"
                                        >
                                            {option}
                                        </button>
                                    ))}
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

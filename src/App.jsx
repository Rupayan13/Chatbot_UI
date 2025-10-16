import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";
import qaData from "./qaData.json";

const App = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sampleQuestions = ["Deploy", "Get All Agents", "Get All Applications"];

  const askQuestion = (userInput) => {
    const input = userInput || question; // card or input
    if (input.trim() === "") return;

    setChatHistory(prev => {
      const isFirstMessage = prev.length === 0;
      const newMessages = [{ type: "user", text: input }];

      if (isFirstMessage) {
        newMessages.push({
          type: "bot",
          messageType: "Statement",
          text: "Hello! Welcome to GenWizard ChatBot.",
        });
      }

      const matchedQA = qaData.find(
        item => input.toLowerCase() === item.question.toLowerCase()
      );

      if (matchedQA) {
        if (matchedQA.type === "Statement") {
          newMessages.push({
            type: "bot",
            messageType: "Statement",
            text: matchedQA.answer,
          });
        } else if (matchedQA.type === "Card") {
          newMessages.push({
            type: "bot",
            messageType: "Card",
            title: matchedQA.question,
            options: matchedQA.options,
          });
        }
      } else {
        newMessages.push({
          type: "bot",
          messageType: "Statement",
          text: "Sorry, I don’t know the answer to that.",
        });
      }

      return [...prev, ...newMessages];
    });

    setQuestion(""); // clear input
  };


  return (
    <div className="grid grid-cols-5 h-screen text-center bg-zinc-900 text-white">
      {/* Sidebar */}
      <Sidebar sampleQuestions={sampleQuestions} setQuestion={setQuestion} />

      {/* Chat Area + Input */}
      <div className="col-span-4 flex flex-col justify-between p-10">
        <h1 className="text-4xl p-5 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
          Hello User, Welcome to GenWizard Deployment ChatBot
        </h1>
        <ChatArea
          chatHistory={chatHistory}
          askQuestion={askQuestion}
        />
        <ChatInput
          question={question}
          setQuestion={setQuestion}
          askQuestion={askQuestion}
        />
      </div>
    </div>
  );
};

export default App;

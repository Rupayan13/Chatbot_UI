import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";
import { askQuestionHandler } from "./utils/askQuestion"; // ✅ import here

const App = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sampleQuestions = ["Deploy", "Service Status", "Disk Info", "Package Info"];

  // Just wrap it to pass the needed state
  const askQuestion = (userInput) => {
    askQuestionHandler({
      userInput,
      question,
      setQuestion,
      setChatHistory,
      sampleQuestions,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-5 text-center bg-zinc-900 text-white overflow-x-hidden">
      {/* Sidebar for desktop and toggle for mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-3 bg-zinc-800 text-white sticky top-0 z-50"
      >
        ☰ Menu
      </button>

      {(sidebarOpen || window.innerWidth >= 768) && (
        <Sidebar
          sampleQuestions={sampleQuestions}
          setQuestion={setQuestion}
          askQuestion={askQuestion}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      <div className="col-span-4 flex flex-col justify-between p-4 sm:p-6 md:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl p-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 text-center">
          Hello User, Welcome to GenWizard Deployment ChatBot
        </h1>

        <ChatArea chatHistory={chatHistory} askQuestion={askQuestion} />

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

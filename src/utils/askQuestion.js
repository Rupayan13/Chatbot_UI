import axios from "axios";
import config from "../configs/appsettings.json";

export const askQuestionHandler = async ({
  userInput,
  question,
  setQuestion,
  setChatHistory,
  sampleQuestions,
}) => {
  const input = userInput || question;
  if (!input.trim()) return;

  //  Convert input to lowercase for case-insensitive comparison
  const normalizedInput = input.trim().toLowerCase();

  // Add user message (immutably)
  setChatHistory((prev) => {
    const isFirstMessage = prev.length === 0;
    const newMessages = [];

    if (isFirstMessage) {
      newMessages.push({
        type: "bot",
        messageType: "Statement",
        text: "Hello! Welcome to GenWizard ChatBot.",
      });
    }

    newMessages.push({ type: "user", text: input }); // keep original case for display

    return [...prev, ...newMessages];
  });

  // Handle "help" - show options as cards
  if (normalizedInput === "help") {
    const options = sampleQuestions.map((i) => ({ displayName: i }));

    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        messageType: "Card",
        title: "Choose an action:",
        options,
      },
    ]);
    setQuestion("");
    return;
  }

  // Handle "deploy" - show options as cards
  if (normalizedInput === "deploy") {
    const deployOptions = [
      { displayName: "Get All Agents" },
      { displayName: "Get All Applications" },
    ];

    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        messageType: "Card",
        title: "Choose an action:",
        options: deployOptions,
      },
    ]);
    setQuestion("");
    return;
  }

  // Handle "get all agents" - fetch from API
  if (normalizedInput === "get all agents") {
    try {
      const res = await axios.get(
        `${config.ApiBaseUrl}${config.DeployEndpoints.GetAllAgents}`
      );
      const agents = Array.isArray(res.data) ? res.data : [res.data];

      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          messageType: "Card",
          title: "Available Agents: Click to see the services",
          options: agents,
        },
      ]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          messageType: "Statement",
          text: "Failed to fetch agents. Check API or CORS settings.",
        },
      ]);
    }

    setQuestion("");
    return;
  }

  // Default fallback
  setChatHistory((prev) => [
    ...prev,
    {
      type: "bot",
      messageType: "Statement",
      text: "Please type 'help' to start the conversation.",
    },
  ]);

  setQuestion("");
};

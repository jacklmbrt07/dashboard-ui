"use client";
import { useChat } from "@ai-sdk/react";

const ChatPage = () => {
  const { messages, sendMessage, status } = useChat();
  console.log(messages, status)

  return (
    <div>
      Chat
      <button onClick={() => sendMessage({ text: "Hi, how are you?"})}>send message</button>
    </div>
  );
};

export default ChatPage;

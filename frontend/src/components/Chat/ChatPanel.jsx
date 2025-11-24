// Hová kerül: frontend/src/components/Chat/ChatPanel.jsx

import React, { useEffect, useState } from "react";
import { sendChatMessage } from "../../services/api.js";
import { ws } from "../../services/ws.js";
import "./ChatPanel.css";

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Subscribe to WebSocket incoming messages
    const unsubscribe = ws.subscribe((data) => {
      if (data.type === "chat_message") {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleSend() {
    if (!input.trim()) return;

    // Send to backend
    await sendChatMessage(input);

    // Show locally for instant feedback
    setMessages((prev) => [
      ...prev,
      { type: "chat_message", sender: "Te", message: input }
    ]);

    setInput("");
  }

  return (
    <div className="chat-panel">
      <h2>Chat</h2>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div className="message" key={i}>
            <span className="sender">{msg.sender}:</span>
            <span className="text">{msg.message}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Írj üzenetet..."
        />
        <button onClick={
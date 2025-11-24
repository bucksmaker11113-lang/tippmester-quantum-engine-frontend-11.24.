import React from "react";
import Navbar from "./components/Navbar.jsx";
import TipPanel from "./components/TipPanel.jsx";
import LivePanel from "./components/LivePanel.jsx";
import KombiPanel from "./components/KombiPanel.jsx";
import ChatPanel from "./components/Chat/ChatPanel.jsx";
import "./styles/App.css";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <section className="main-panels">
          <TipPanel />
          <LivePanel />
          <KombiPanel />
        </section>
        <ChatPanel />
      </main>
    </div>
  );
}
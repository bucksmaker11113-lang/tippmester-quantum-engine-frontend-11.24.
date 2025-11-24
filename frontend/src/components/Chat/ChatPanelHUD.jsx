// Hová kerül: frontend/src/components/Chat/ChatPanelHUD.jsx

import React from "react";
import "./ChatPanelHUD.css";

// Egyszerű HUD overlay, ami a chat státuszát vagy rendszerszintű üzeneteket tud megjeleníteni
export default function ChatPanelHUD({ status = "online" }) {
  const statusLabel = {
    online: "Kapcsolat élő",
    reconnecting: "Újracsatlakozás...",
    offline: "Nincs kapcsolat"
  }[status] || "Ismeretlen";

  return (
    <div className={`chat-hud ${status}`}>
      <span>{statusLabel}</span>
    </div>
  );
}
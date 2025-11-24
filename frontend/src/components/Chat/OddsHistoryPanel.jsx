// Hová kerül: frontend/src/components/Chat/OddsHistoryPanel.jsx

import React, { useEffect, useState } from "react";
import { ws } from "../../services/ws.js";
import OddsChart from "./OddsChart.jsx";
import "./OddsHistoryPanel.css";

export default function OddsHistoryPanel() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Élő odds frissítések WebSocketből
    const unsubscribe = ws.subscribe((data) => {
      if (data.type === "odds_update") {
        setHistory((prev) => [...prev.slice(-50), data.value]); // utolsó 50 érték
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="odds-history-panel">
      <h3>Odds Történet</h3>
      <OddsChart data={history} />
    </div>
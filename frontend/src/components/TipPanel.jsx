import React, { useEffect, useState } from "react";
import { fetchTips } from "../services/api.js";
import "./tipPanel.css";

export default function TipPanel() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTips() {
      try {
        const res = await fetchTips();
        setTips(res.data || []);
      } catch (err) {
        setError("Nem sikerült betölteni a tippeket");
      } finally {
        setLoading(false);
      }
    }

    loadTips();
  }, []);

  if (loading) return <div className="tip-panel">Betöltés...</div>;
  if (error) return <div className="tip-panel error">{error}</div>;

  return (
    <div className="tip-panel">
      <h2>Napi Tippek</h2>
      <div className="tip-list">
        {tips.length === 0 && <p>Nincs elérhető tipp.</p>}
        {tips.map((tipp, i) => (
          <div className="tip-item" key={i}>
            <div className="match">{tipp.match}</div>
            <div className="odds">Odds: {tipp.odds}</div>
            <div className="prediction">Tipp: {tipp.prediction}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
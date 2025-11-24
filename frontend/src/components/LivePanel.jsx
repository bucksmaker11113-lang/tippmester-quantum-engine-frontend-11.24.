import React, { useEffect, useState } from "react";
import { fetchLiveTips } from "../services/api.js";
import "./LivePanel.css";

export default function LivePanel() {
  const [liveTips, setLiveTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLive() {
      try {
        const res = await fetchLiveTips();
        setLiveTips(res.data || []);
      } catch (err) {
        setError("Nem sikerült betölteni a LIVE tippeket");
      } finally {
        setLoading(false);
      }
    }

    loadLive();
  }, []);

  if (loading) return <div className="live-panel">Betöltés...</div>;
  if (error) return <div className="live-panel error">{error}</div>;

  return (
    <div className="live-panel">
      <h2>Live Tippek</h2>
      <div className="live-list">
        {liveTips.length === 0 && <p>Nincs élő tipp.</p>}
        {liveTips.map((item, i) => (
          <div className="live-item" key={i}>
            <div className="match">{item.match}</div>
            <div className="odds">Odds: {item.odds}</div>
            <div className="status">{item.status}</div>
          </div>
        ))}
      </div>
    </div
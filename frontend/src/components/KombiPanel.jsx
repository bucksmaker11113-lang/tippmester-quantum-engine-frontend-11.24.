// Hová kerül: frontend/src/components/KombiPanel.jsx

import React, { useEffect, useState } from "react";
import { fetchKombi } from "../services/api.js";
import "./KombiPanel.css";

export default function KombiPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchKombi();
        setItems(res.data || []);
      } catch (err) {
        setError("Nem sikerült betölteni a Kombi adatokat");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div className="kombi-panel">Betöltés...</div>;
  if (error) return <div className="kombi-panel error">{error}</div>;

  return (
    <div className="kombi-panel">
      <h2>Kombi Szelvény</h2>
      <div className="kombi-list">
        {items.length === 0 && <p>Nincs adat.</p>}

        {items.map((item, i) => (
          <div className="kombi-item" key={i}>
            <div className="match">{item.match}</div>
            <div className="odds">Odds: {item.odds}</div>
            <div className="stake">Tét: {item.stake}</div>
            <div className="return">Várható nyeremény: {item.expected_return}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
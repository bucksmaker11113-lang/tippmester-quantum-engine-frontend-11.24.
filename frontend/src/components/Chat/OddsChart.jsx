// Hová kerül: frontend/src/components/Chat/OddsChart.jsx

import React, { useEffect, useRef } from "react";
import "./OddsChart.css";

/*
  Egyszerű élő odds-grafikon canvas alapon.
  A backend WS-ből érkező odds-históriát tudja kirajzolni.
*/

export default function OddsChart({ data = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!data.length) return;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    ctx.strokeStyle = "#0af";
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((value, i) => {
      const x = (i / (data.length - 1)) * canvas.width;
      const y = canvas.height - ((value - min) / range) * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [data]);

  return (
    <div className="odds-chart-container">
      <canvas ref={canvasRef} width={300} height={120}></canvas>
    </div>
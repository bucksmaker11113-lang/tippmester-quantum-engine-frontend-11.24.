// LiveCard3D.jsx (Premium Live Match Holographic Card)
// - Real-time oriented design
// - Expandable live panel (score, momentum, bankroll suggestion)
// - Mobile optimized, minimal GPU load, consistent with Single/Kombi cards

import { useState, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LiveCard3D({ liveData = {}, mobile = false }) {
  const [expanded, setExpanded] = useState(false);
  const meshRef = useRef();

  const geometry = useMemo(() => new THREE.BoxGeometry(1.9, 1.1, 0.1), []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00ffaa",
        emissive: "#006644",
        emissiveIntensity: expanded ? 1.0 : mobile ? 0.3 : 0.6,
        metalness: 0.75,
        roughness: 0.2,
        opacity: 0.9,
        transparent: true,
      }),
    [mobile, expanded]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!expanded) {
      meshRef.current.rotation.y = Math.sin(t * 0.35) * 0.04;
    }
  });

  return (
    <>
      {/* 3D Card */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        onClick={() => setExpanded((x) => !x)}
      />

      {/* Expanded Live Panel */}
      {expanded && (
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translateX(-50%)",
            width: mobile ? "92%" : "58%",
            padding: "18px",
            background: "rgba(0,18,10,0.85)",
            color: "#00ffaa",
            border: "2px solid #00bb77",
            borderRadius: "14px",
            boxShadow: "0 0 30px #00ffcc",
            zIndex: 999,
          }}
        >
          <h2>Live Match Details</h2>

          <p><strong>Match:</strong> {liveData.match}</p>
          <p><strong>Status:</strong> {liveData.status}</p>
          <p><strong>Score:</strong> {liveData.score}</p>
          <p><strong>Momentum:</strong> {liveData.momentum}</p>
          <p><strong>Live Odds:</strong> {liveData.liveOdds}</p>

          <p><strong>AI Bankroll Suggestion:</strong> {liveData.bankroll}%</p>

          <button
            onClick={() => setExpanded(false)}
            style={{
              marginTop: "12px",
              padding: "9px 14px",
              border: "none",
              background: "#00ffaa",
              color: "#003322",
              borderRadius: "6px",
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

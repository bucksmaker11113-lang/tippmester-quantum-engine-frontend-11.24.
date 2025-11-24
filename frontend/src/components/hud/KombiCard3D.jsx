// KombiCard3D.jsx (Premium Expandable Holographic Combo Tip Card)
// - Displays multiple combined picks
// - Expandable panel with bankroll + combined odds
// - Mobile-optimized & low GPU usage
// - Matches the style of SingleCard3D

import { useState, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function KombiCard3D({ comboData = [], mobile = false }) {
  const [expanded, setExpanded] = useState(false);
  const meshRef = useRef();

  // Slightly wider card since it represents multiple tips
  const geometry = useMemo(() => new THREE.BoxGeometry(2.0, 1.1, 0.1), []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00eaff",
        emissive: "#004a66",
        emissiveIntensity: expanded ? 1.0 : mobile ? 0.3 : 0.6,
        metalness: 0.8,
        roughness: 0.2,
        opacity: 0.9,
        transparent: true,
      }),
    [mobile, expanded]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!expanded) {
      meshRef.current.rotation.y = Math.sin(t * 0.25) * 0.05;
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

      {/* Expanded Panel */}
      {expanded && (
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: "50%",
            transform: "translateX(-50%)",
            width: mobile ? "92%" : "60%",
            padding: "18px",
            background: "rgba(0,20,30,0.85)",
            color: "#00eaff",
            border: "2px solid #0088aa",
            borderRadius: "14px",
            boxShadow: "0 0 28px #00cfff",
            zIndex: 999,
          }}
        >
          <h2>Kombi Tipp Részletei</h2>

          {comboData.length === 0 && <p>Nincs elérhető adat.</p>}

          {comboData.map((item, i) => (
            <div
              key={i}
              style={{
                marginBottom: "10px",
                paddingBottom: "10px",
                borderBottom: "1px solid #005577",
              }}
            >
              <p><strong>Meccs:</strong> {item.match}</p>
              <p><strong>Tipp:</strong> {item.pick}</p>
              <p><strong>Odds:</strong> {item.odds}</p>
            </div>
          ))}

          <p>
            <strong>Kombinált össz-odds:</strong> {
              comboData.reduce((acc, x) => acc * (x.odds || 1), 1).toFixed(2)
            }
          </p>

          <p>
            <strong>Bankroll javaslat:</strong> {
              (comboData.length * 0.5).toFixed(1)
            }% (kombinált kockázat alapján)
          </p>

          <button
            onClick={() => setExpanded(false)}
            style={{
              marginTop: "12px",
              padding: "9px 14px",
              border: "none",
              background: "#00eaff",
              color: "#003344",
              borderRadius: "6px",
            }}
          >
            Bezárás
          </button>
        </div>
      )}
    </>
  );
}
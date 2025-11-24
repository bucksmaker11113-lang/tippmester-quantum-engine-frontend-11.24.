// SingleCard3D.jsx (Premium Expandable Holographic Tip Card)
// - Modern 3D card
// - Expandable panel for bankroll + tip details
// - Mobile-optimized & low GPU usage
// - Minimal code changes to fit your existing structure

import { useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SingleCard3D({ tipData, mobile = false }) {
  const [expanded, setExpanded] = useState(false);
  const meshRef = useRef();

  // Base geometry
  const geometry = useMemo(() => new THREE.BoxGeometry(1.6, 1, 0.1), []);

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
    meshRef.current.rotation.y = expanded ? 0 : Math.sin(t * 0.3) * 0.05; // light idle wiggle
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

      {/* Expanded HUD Panel */}
      {expanded && (
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: mobile ? "90%" : "55%",
            padding: "15px",
            background: "rgba(0,20,30,0.85)",
            color: "#00eaff",
            border: "2px solid #0088aa",
            borderRadius: "12px",
            boxShadow: "0 0 25px #00cfff",
            zIndex: 999,
          }}
        >
          <h2>Single Tip Details</h2>
          <p><strong>Match:</strong> {tipData?.match}</p>
          <p><strong>Pick:</strong> {tipData?.pick}</p>
          <p><strong>Odds:</strong> {tipData?.odds}</p>
          <p><strong>Bankroll Suggestion:</strong> {tipData?.bankroll}</p>
          <button
            onClick={() => setExpanded(false)}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              border: "none",
              background: "#00eaff",
              color: "#003344",
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
// HoloGrid.jsx (Optimized for Mobile & Low GPU Load)
// - Reduced line count on mobile
// - Memoized geometry
// - Lightweight shimmering animation

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HoloGrid({ mobile = false }) {
  const gridRef = useRef();

  const size = 10;
  const divisions = mobile ? 10 : 20; // lighter grid for mobile

  const grid = useMemo(() => new THREE.GridHelper(size, divisions, "#00eaff", "#004466"), [size, divisions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    gridRef.current.material.opacity = mobile ? 0.15 : 0.25;
    gridRef.current.position.y = Math.sin(t * 0.4) * 0.05; // subtle hover
  });

  return <primitive ref={gridRef} object={grid} />;
}
// CoreSphere.jsx (Optimized for Mobile + Low GPU Load)
// - Reduced useFrame work
// - Memoized geometry/material
// - Adaptive detail based on device performance

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export default function CoreSphere({ mobile = false }) {
  const meshRef = useRef();

  // Lower polycount for mobile to reduce CPU/GPU load
  const detail = mobile ? 8 : 16;

  const geometry = useMemo(() => new THREE.SphereGeometry(1.2, detail, detail), [detail]);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: "#00eaff",
      emissive: "#0077aa",
      emissiveIntensity: mobile ? 0.3 : 0.7,
      roughness: 0.1,
      metalness: 0.6,
    }),
    [mobile]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Minimal rotation (cost-effective)
    meshRef.current.rotation.y = t * (mobile ? 0.1 : 0.25);
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

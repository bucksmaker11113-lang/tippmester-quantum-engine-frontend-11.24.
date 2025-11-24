// HoloRing.jsx (Optimized for Mobile + Low GPU Load)
// - Reduced rotations + pulsing
// - Memoized geometry + materials
// - Adaptive emissive intensity for cost-effective GPU usage

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HoloRing({ mobile = false }) {
  const ringRef = useRef();

  // Adaptive segment count
  const segments = mobile ? 32 : 64;

  const geometry = useMemo(() => {
    return new THREE.RingGeometry(1.2, 1.5, segments);
  }, [segments]);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00eaff",
        side: THREE.DoubleSide,
        opacity: 0.8,
        transparent: true,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Minimal performance-friendly rotation
    ringRef.current.rotation.z = t * (mobile ? 0.1 : 0.25);

    // Soft pulsing effect
    const pulse = 1 + Math.sin(t * 2) * (mobile ? 0.03 : 0.08);
    ringRef.current.scale.set(pulse, pulse, pulse);
  });

  return <mesh ref={ringRef} geometry={geometry} material={material} />;
}
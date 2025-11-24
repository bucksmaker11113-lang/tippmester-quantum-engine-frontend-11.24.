import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function MiniTabSphere({ color="white", onClick }) {
    const ref = useRef();

    useFrame(() => {
        ref.current.rotation.y += 0.01;
        ref.current.position.y = Math.sin(Date.now() * 0.002) * 0.05;
    });

    return (
        <mesh ref={ref} onClick={onClick}>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
    );
}

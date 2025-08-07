// "use client";
// import { type FC, useRef, useMemo } from "react";
// import { Html } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { useInstrumentStore } from "@/hooks/useInstrumentStore";
// import { Instruments } from "@/resources/types";
// import Instrument from "@/components/instrument/Instrument";


// /** base box dimensions (before scaling) */
// const BASE_LEN = 4       // 21-fret guitars
// const BASE_HT_GTR = 0.2  // guitars (6 strings @ nut ≈ 43 mm)
// const BASE_HT_BASS = 0.25 // basses are typically a little deeper
// const DEPTH = 0.2        // thin like a neck


// export const GuitarNeck: FC = () => {
//   const neck = useRef<THREE.Mesh>(null!);
//   const instrument = useInstrumentStore((s) => s.instrument);
//   const stringQty = useInstrumentStore((s) => s.stringQty);
//   const fretQuantity = useInstrumentStore((s) => s.fretQuantity);

//   const targetLength = BASE_LEN * (fretQuantity / 21); // 24 frets = +14%
//   const baseHeight = instrument === Instruments.Bass ? BASE_HT_BASS : BASE_HT_GTR
//   const targetHeight = baseHt * (stringQty / 6)

//   const geometry = useMemo(() => <boxGeometry args={[BASE_LEN, 1, DEPTH]} />, []);

//   useFrame(() => {
//     const mesh = neck.current;
//     if (!mesh) return
//     mesh.scale.x = THREE.MathUtils.lerp(mesh.scale.x, targetLength / BASE_LEN, 0.1)
//     mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, targetHeight, 0.1)
//   })

//   return (
//     <mesh ref={neck}>
//       {geometry}
//       <meshStandardMaterial color="#8b5a2b" />

//       <Html
//         transform // copy world matrix into the DOM
//         position={[0, 0.5 * targetHeight + 0.01, 0]} // sit just above the wood
//         rotation={[-Math.PI / 2, 0, 0]} // lie flat
//         occlude // hide when mesh is behind other geometry
//         distanceFactor={30}
//       >
//         <Instrument show={true} />;
//       </Html>
//     </mesh>
//   );
// };

// Because transform is true, the DOM tree inherits the mesh’s world matrix,
// so it sticks to, rotates and scales with the cuboid neck.
//You can still style it with CSS, hook up React state, etc.
// If you have z-fighting with other <Html> nodes, Drei’s zIndexRange helper or plain CSS z-index solves it.

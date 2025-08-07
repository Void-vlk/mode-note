// import { InteractiveSphere } from "@/components/three/InteractiveSphere";
// import { GuitarNeck } from "@/components/three/GuitarNeck";
import WebGPUCanvas from "@/components/three/WebGPUCanvas";

export default function ThreeDHome() {
  return (
    <div className="!bg-white">
      <WebGPUCanvas>
        {/* <InteractiveSphere /> */}
        {/* <GuitarNeck /> */}
      </WebGPUCanvas>
    </div>
  );
}

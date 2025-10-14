import { CircleOfFifths } from "@/components/learning/CircleOfFifthsContent";
import CircleOfFifthsSVG from "@/components/learning/CircleOfFifthsSVG";

export default function CircleOfFifthsPage() {
  return (
    <section className="relative flex justify-center items-center h-svh w-full border-4 border-blue">
      <CircleOfFifths />
      <CircleOfFifthsSVG />
    </section>
  );
}

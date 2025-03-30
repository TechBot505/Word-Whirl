import { HomeContent } from "@/components/home/home-content";
import { ThreeBackground } from "@/components/three/three-background";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <ThreeBackground />
      <HomeContent />
    </main>
  );
}
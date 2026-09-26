import { BackgroundVideo } from "@/components/BackgroundVideo";
import { Hero } from "@/components/Hero";

export default function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundVideo />
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  );
}

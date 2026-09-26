import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { LogoMarquee } from "@/components/LogoMarquee";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-visible">
      {/* Soft dark shape behind the copy for legibility over the video */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[527px] w-[984px] -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-90 blur-[82px]" />

      <Navbar />

      <div className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <h1
            className="text-[64px] font-normal leading-[1.02] tracking-[-0.024em] sm:text-[140px] lg:text-[220px]"
            style={{ fontFamily: '"General Sans", sans-serif' }}
          >
            <span className="text-foreground">Power </span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)" }}
            >
              AI
            </span>
          </h1>
          <p className="mt-[9px] max-w-md text-lg leading-8 text-hero-sub opacity-80">
            The most powerful AI ever deployed
            <br />
            in talent acquisition
          </p>
          <Button variant="heroSecondary" size="none" className="mt-[25px] px-[29px] py-[24px]">
            Schedule a Consult
          </Button>
        </div>
      </div>

      <LogoMarquee />
    </section>
  );
}

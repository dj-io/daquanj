
import { cn } from "@/lib/utils";
import { HeroSection } from "@/components/hero";
import { Particles } from "@/components/magicui/particles";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">


      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <HeroSection />
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Particles
          quantity={300}
          size={0.9}
          ease={80}
          refresh={true}
          color="#383838"
          className="w-full h-full opacity-50 dark:opacity-80 text-foreground dark:text-white/40 light:text-white/40"
        />
      </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center pt-24 fixed bottom-0 w-full">
         {/* Section heading and grid (z-10 to be above particles) */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center mb-10">
        <h2 className="text-2xl sm:text-xl font-semibold text-center text-[#9CA3AF] dark:text-[#9CA3AF] transition-colors duration-300 mb-1">
          Focus without fragmentation.
        </h2>
        <p className={cn(
          "text-base sm:text-lg font-medium text-center",
          "bg-clip-text text-transparent",
          "bg-gradient-to-r",
          "from-foreground via-foreground/80 to-foreground/60",
          "dark:from-white dark:via-[#bfc3c9] dark:to-[#6b7280]",
          "transition-colors duration-300"
        )}>
          Get ready to meet your new unified Notespace.
        </p>
      </div>
      </footer>
    </div>
  );
}

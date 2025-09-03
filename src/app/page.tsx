import { HeroSection } from "@/components/hero";

export default function Home() {
  return (
    <div className="h-dvh overflow-hidden">
      <main className="h-full flex items-center justify-center pt-[4.5rem] lg:pt-20">
        <HeroSection />
      </main>
    </div>
  );
}

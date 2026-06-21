import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Stack } from "@/components/sections/Stack";
import { Stats } from "@/components/sections/Stats";
import { TrackRecord } from "@/components/sections/TrackRecord";
import { Workbench } from "@/components/sections/Workbench";
import { Nav } from "@/components/Nav";
import { Ambient } from "@/components/ui/Ambient";

// Server component. Above-the-fold HTML is fully static; small client islands
// (Nav, CountUp, Reveal, ProjectShowcase, MagneticCTA) hydrate on demand.

export default function Home() {
  return (
    <div className="shell">
      <Ambient />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <TrackRecord />
        <Stack />
        <MarqueeBand />
        <SelectedWork />
        <Workbench />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

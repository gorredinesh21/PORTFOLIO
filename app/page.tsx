import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Workbench } from "@/components/workbench";
import { MiniProjects } from "@/components/mini-projects";
import { Approach } from "@/components/approach";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Awards } from "@/components/awards";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Workbench />
      <MiniProjects />
      <Approach />
      <About />
      <Experience />
      <Awards />
      <Contact />
    </>
  );
}

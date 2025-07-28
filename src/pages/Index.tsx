import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";
import { TableOfContents } from "@/components/TableOfContents";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Projects />
      <TechStack />
      <Contact />
      <TableOfContents />
    </div>
  );
};

export default Index;

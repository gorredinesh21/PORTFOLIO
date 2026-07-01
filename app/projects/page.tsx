import { PageHeader } from "@/components/page-header";
import { ProjectGallery } from "@/components/project-gallery";

export const metadata = { title: "Projects — Dinesh" };

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Projects"
        title="Things I've built, end to end"
        description="From AI research platforms to MERN storefronts and banking APIs — a spread across the domains I work in. Filter by area to explore."
      />
      <ProjectGallery />
    </div>
  );
}

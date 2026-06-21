import { ArrowUpRight } from "lucide-react";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";

// Server shell. Content + headings render statically. ProjectShowcase is a
// client island that drives the cursor-anchored preview and dim peers.

export function SelectedWork() {
  return (
    <section className="section" id="selected-work" aria-labelledby="work-title">
      <Reveal from="up">
        <div className="work-head">
          <div>
            <p className="eyebrow">
              <span className="num">04</span> Selected Work
            </p>
            <h2 id="work-title">
              Every repository, <span className="accent-blue serif">in one place.</span>
            </h2>
          </div>
          <p>
            All {portfolio.projects.length} public repositories on GitHub.
            Hover a row for the case study; click to open the full record.
          </p>
        </div>
      </Reveal>

      <ProjectShowcase projects={portfolio.projects} />

      <a
        className="work-link"
        href={`${portfolio.person.github}?tab=repositories`}
        target="_blank"
        rel="noreferrer"
      >
        View all repositories on GitHub <ArrowUpRight size={16} />
      </a>
    </section>
  );
}

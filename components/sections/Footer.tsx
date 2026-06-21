import { ArrowUp2, Sms } from "iconsax-react";

import { portfolio } from "@/data/portfolio";
import { GithubIcon } from "@/components/ui/GithubIcon";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot-band" role="contentinfo">
      <div className="foot">
        <span>© {year} {portfolio.person.name}</span>
        <nav className="foot-links" aria-label="Footer">
          <a
            href={portfolio.person.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon size={14} /> GitHub
          </a>
          <a href={`mailto:${portfolio.person.email}`}>
            <Sms size={14} variant="Linear" /> Email
          </a>
          <a href="#about">
            <ArrowUp2 size={14} variant="Linear" /> Back to top
          </a>
        </nav>
        <span>Designed and built with intent.</span>
      </div>
    </footer>
  );
}

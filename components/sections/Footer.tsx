import { portfolio } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot" role="contentinfo">
      <span>© {year} {portfolio.person.name}</span>
      <nav className="foot-links" aria-label="Footer">
        <a
          href={portfolio.person.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a href={`mailto:${portfolio.person.email}`}>Email</a>
        <a href="#about">Back to top</a>
      </nav>
      <span>Designed and built with intent.</span>
    </footer>
  );
}

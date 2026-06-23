import { GptTastePortfolio } from "@/components/GptTastePortfolio";

const GITHUB_USER = "Anshuman791322";
const FALLBACK_REPO_COUNT = 6;

// Fetched at build time. With `output: "export"`, the value is baked into the
// emitted HTML and never re-fetched from the browser. Falls back to the last
// known value if the API is unreachable or rate-limited during the build.
async function getPublicRepoCount(): Promise<number> {
  try {
    const headers: Record<string, string> = {
      "User-Agent": "anshuman-portfolio-build",
      Accept: "application/vnd.github+json",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner`,
      { headers, cache: "force-cache" },
    );
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const repos = (await res.json()) as Array<{ fork: boolean }>;
    return repos.filter((r) => !r.fork).length || FALLBACK_REPO_COUNT;
  } catch {
    return FALLBACK_REPO_COUNT;
  }
}

export default async function Home() {
  const publicRepoCount = await getPublicRepoCount();
  return <GptTastePortfolio publicRepoCount={publicRepoCount} />;
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 / off course</p>
      <h1>This route does not exist.</h1>
      <Link className="button primary-button" href="/">
        Return home
      </Link>
    </main>
  );
}

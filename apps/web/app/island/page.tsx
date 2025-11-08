import TimeClient from "./TimeClient";

export default async function IslandsPage() {
  const data = await fetch("https://api.github.com/repos/vercel/next.js").then(
    (r) => r.json(),
  );
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Islands Architecture</h1>
      <p>Server rendered stars: {data.stargazers_count}</p>
      <TimeClient />
    </div>
  );
}

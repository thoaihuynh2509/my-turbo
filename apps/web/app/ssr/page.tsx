export const dynamic = 'force-dynamic' // SSR per request

export default async function SSRPage() {
  const data = await fetch('https://api.github.com/zen', {
    cache: 'no-store',
    headers: { 'User-Agent': 'NextJS-SSR-Demo' },
  }).then((res) => res.text())

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Server-side Rendering</h1>
      <p>Message from GitHub: {data}</p>
    </div>
  )
}

export const dynamic = 'force-static' // static generation at build time
export const revalidate = 60

export default async function SSGPage() {
  const data = await fetch('https://api.github.com/repos/vercel/next.js', {
    next: { revalidate: 300 }, // cache 5 phút
  }).then(res => res.json())

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Static Site Generation</h1>
      <p>Stars: {data.stargazers_count}</p>
      <p>Last updated: {new Date().toLocaleString()}</p>
    </div>
  )
}
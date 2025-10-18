export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function EdgePage() {
  const data = await fetch('https://api.ipify.org?format=json').then(r => r.json())

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Edge Rendering</h1>
      <p>Your IP: {data.ip}</p>
    </div>
  )
}

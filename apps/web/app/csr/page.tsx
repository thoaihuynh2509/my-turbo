'use client'

import { useState, useEffect } from 'react'

export default function CSRPage() {
  const [time, setTime] = useState<string>('loading...')

  useEffect(() => {
    setTime(new Date().toLocaleTimeString())
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Client-side Rendering</h1>
      <p>Rendered at: {time}</p>
    </div>
  )
}

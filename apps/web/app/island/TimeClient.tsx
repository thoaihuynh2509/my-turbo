"use client";
import { useState, useEffect } from "react";

export default function TimeClient() {
  const [time, setTime] = useState("");
  useEffect(() => setTime(new Date().toLocaleTimeString()), []);
  return <p>Hydrated island time: {time}</p>;
}

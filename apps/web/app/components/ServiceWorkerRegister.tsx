// components/ServiceWorkerRegister.tsx
"use client";

import { useEffect } from "react";

const NODE_ENV = process?.env?.NODE_ENV || "development";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    }
  }, []);

  return null;
}

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function DataBar() {
  const [ping, setPing] = useState(null);

  useEffect(() => {
    const pingServer = async () => {
      const start = performance.now();
      try {
        // Using Cloudflare's public CDN (very fast & reliable)
        await fetch("https://1.1.1.1/cdn-cgi/trace", { cache: "no-store" });
        const end = performance.now();
        setPing(Math.round(end - start));
      } catch (err) {
        setPing(null); // null if failed
      }
    };

    // First check immediately
    pingServer();

    // Then check every 5 seconds
    const interval = setInterval(pingServer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 text-white">
      <span className="flex flex-col justify-center items-center">
        <Icon icon="material-symbols:wifi-rounded" />
        <span>
          {ping !== null ? `${ping}ms` : "—"}
        </span>
      </span>
    </div>
  );
}

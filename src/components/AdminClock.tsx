"use client";

import { useEffect, useState } from "react";

export function AdminClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return null;

  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(now);

  const time = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  return (
    <div className="admin-clock" aria-label={`Data ${date}, hora ${time}`}>
      <span>{date}</span>
      <strong>{time}</strong>
    </div>
  );
}

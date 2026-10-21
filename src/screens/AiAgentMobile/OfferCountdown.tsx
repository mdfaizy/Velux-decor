import React, { useEffect, useState } from "react";

const getRemaining = (end: number) => {
  const diff = Math.max(0, end - Date.now());
  return {
    total: diff,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number) => String(n).padStart(2, "0");

interface OfferCountdownProps {
  endDate: string;
  variant?: "boxes" | "inline";
}

/* Live "ends in" timer. Renders nothing once the offer has ended. */
export const OfferCountdown: React.FC<OfferCountdownProps> = ({
  endDate,
  variant = "boxes",
}) => {
  const end = new Date(endDate).getTime();
  const [left, setLeft] = useState(() => getRemaining(end));

  useEffect(() => {
    const t = setInterval(() => setLeft(getRemaining(end)), 1000);
    return () => clearInterval(t);
  }, [end]);

  if (left.total <= 0) return null;

  if (variant === "inline") {
    return (
      <span className="font-semibold tabular-nums">
        {left.days > 0 && `${left.days}d `}
        {pad(left.hours)}h {pad(left.minutes)}m {pad(left.seconds)}s
      </span>
    );
  }

  const units = [
    { label: "Days", value: left.days },
    { label: "Hours", value: left.hours },
    { label: "Mins", value: left.minutes },
    { label: "Secs", value: left.seconds },
  ];

  return (
    <div className="flex gap-2 sm:gap-3" role="timer" aria-label="Offer ends in">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex flex-col items-center justify-center rounded-lg w-14 h-14 sm:w-16 sm:h-16"
          style={{
            background: "rgba(250,247,242,0.08)",
            border: "1px solid rgba(201,168,76,0.35)",
          }}
        >
          <span
            className="text-xl sm:text-2xl font-semibold tabular-nums"
            style={{ color: "#F5E6C8", fontFamily: "'Playfair Display',serif" }}
          >
            {pad(u.value)}
          </span>
          <span className="text-[10px] uppercase tracking-widest" style={{ color: "#C9A84C" }}>
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
};

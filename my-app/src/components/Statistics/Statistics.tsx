"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Statistics.module.scss";

interface Stat {
  id: number;
  value: string;
  label: string;
}

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!active) return;
    const prefix = target.startsWith("+") ? "+" : "";
    const suffix = target.endsWith("%") ? "%" : "";
    const num = parseInt(target.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num)) { setDisplay(target); return; }
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setDisplay(`${prefix}${num}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplay(`${prefix}${start}${suffix}`);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return display;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.value, active);
  return (
    <div className={styles.card}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{stat.label}</span>
    </div>
  );
}

interface StatisticsProps {
  initialStats?: Stat[];
}

export default function Statistics({ initialStats = [] }: StatisticsProps) {
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (stats.length > 0) return;
    fetch("/api/db")
      .then((r) => r.json())
      .then((data) => setStats(data.statistics ?? []));
  }, [stats.length]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.statistics} aria-label="Key statistics">
      <div className={styles.inner}>
        {stats.map((s) => (
          <StatCard key={s.id} stat={s} active={active} />
        ))}
      </div>
    </section>
  );
}

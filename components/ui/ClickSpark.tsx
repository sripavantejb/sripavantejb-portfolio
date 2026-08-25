"use client";

import { useRef, useEffect, type ReactNode } from "react";

type Spark = { x: number; y: number; angle: number; startTime: number };

function easeAt(easing: "linear" | "ease-in" | "ease-in-out" | "ease-out", t: number) {
  switch (easing) {
    case "linear":
      return t;
    case "ease-in":
      return t * t;
    case "ease-in-out":
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    default:
      return t * (2 - t);
  }
}

export function ClickSpark({
  sparkColor = "#c8f542",
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}: {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-in-out" | "ease-out";
  extraScale?: number;
  children: ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const runningRef = useRef(false);
  const animationIdRef = useRef<number | null>(null);
  const configRef = useRef({ sparkColor, sparkSize, sparkRadius, duration, easing, extraScale });

  useEffect(() => {
    configRef.current = { sparkColor, sparkSize, sparkRadius, duration, easing, extraScale };
  }, [sparkColor, sparkSize, sparkRadius, duration, easing, extraScale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);
    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const count = sparkCount;

    const now = performance.now();
    sparksRef.current.push(
      ...Array.from({ length: count }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / count,
        startTime: now,
      }))
    );

    const draw = (timestamp: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        runningRef.current = false;
        return;
      }

      const cfg = configRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= cfg.duration) return false;

        const progress = elapsed / cfg.duration;
        const eased = easeAt(cfg.easing, progress);
        const distance = eased * cfg.sparkRadius * cfg.extraScale;
        const lineLength = cfg.sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = cfg.sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        animationIdRef.current = requestAnimationFrame(draw);
      } else {
        runningRef.current = false;
        animationIdRef.current = null;
      }
    };

    if (!runningRef.current) {
      runningRef.current = true;
      animationIdRef.current = requestAnimationFrame(draw);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}

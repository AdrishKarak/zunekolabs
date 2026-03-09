import { useState, useEffect, useCallback, type JSX } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Correct easing type */
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PROJECTS = [
  {
    tag: "Computer Vision",
    title: "Retail Inventory AI",
    desc: "Real-time shelf monitoring using edge-deployed CV models.",
    stat: "94% error reduction",
    color: "#00e87a",
    visual: "retail",
  },
  {
    tag: "ERP",
    title: "Enterprise ERP Migration",
    desc: "10,000+ user migration to ERPNext with automation.",
    stat: "10,000+ users onboarded",
    color: "#00b85e",
    visual: "erp",
  },
  {
    tag: "LLM Engineering",
    title: "Document Intelligence Platform",
    desc: "Multi-format parsing with GPT-4o + RAG pipelines.",
    stat: "12 FTE hours/day saved",
    color: "#c9a84c",
    visual: "llm",
  },
];

/* Visual Component */
function CardVisual({ type }: { type: string; color: string }) {
  const visuals: Record<string, JSX.Element> = {
    retail: (
      <svg viewBox="0 0 480 200" style={{ width: "100%", height: "100%" }}>
        <rect width="480" height="200" fill="#061a0e" />
      </svg>
    ),
    erp: (
      <svg viewBox="0 0 480 200" style={{ width: "100%", height: "100%" }}>
        <rect width="480" height="200" fill="#061a0e" />
      </svg>
    ),
    llm: (
      <svg viewBox="0 0 480 200" style={{ width: "100%", height: "100%" }}>
        <rect width="480" height="200" fill="#061a0e" />
      </svg>
    ),
  };

  return visuals[type] || visuals.retail;
}

/* Main Component */

export function ShowCaseCards() {
  const [active, setActive] = useState(0);
  const total = PROJECTS.length;

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setActive((i) => (i + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const t = setInterval(() => navigate(1), 4500);
    return () => clearInterval(t);
  }, [navigate]);

  const getIdx = (offset: number) => (active + offset + total) % total;

  return (
    <section style={{ padding: "120px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <h2>What We've Built</h2>
        </motion.div>

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            height: "520px",
            perspective: "1200px",
          }}
        >
          <CardSlot
            project={PROJECTS[getIdx(-1)]}
            position={-1}
            onClick={() => navigate(-1)}
          />

          <CardSlot
            project={PROJECTS[getIdx(0)]}
            position={0}
            onClick={() => {}}
          />

          <CardSlot
            project={PROJECTS[getIdx(1)]}
            position={1}
            onClick={() => navigate(1)}
          />

          <button
            onClick={() => navigate(-1)}
            style={{ position: "absolute", left: 0 }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => navigate(1)}
            style={{ position: "absolute", right: 0 }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "40px",
          }}
        >
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "28px" : "8px",
                height: "8px",
                borderRadius: "100px",
                background:
                  i === active
                    ? "var(--accent-primary)"
                    : "rgba(0,232,122,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Card Slot */

function CardSlot({
  project,
  position,
  onClick,
}: {
  project: typeof PROJECTS[0];
  position: number;
  onClick: () => void;
}) {
  const isActive = position === 0;

  const translateX = position * 320;
  const scale = isActive ? 1 : 0.8;
  const opacity = isActive ? 1 : 0.6;

  return (
    <motion.div
      animate={{ x: translateX, scale, opacity }}
      transition={{ duration: 0.6, ease: EASE_SMOOTH }}
      onClick={!isActive ? onClick : undefined}
      style={{
        position: "absolute",
        width: "420px",
        cursor: isActive ? "default" : "pointer",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(0,232,122,0.12)",
          borderRadius: "16px",
          background: "#061a0e",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "200px" }}>
          <CardVisual type={project.visual} color={project.color} />
        </div>

        <div style={{ padding: "24px" }}>
          <h3 style={{ color: "white" }}>{project.title}</h3>

          <p style={{ color: "#8ab59a" }}>{project.desc}</p>

          <span style={{ color: project.color }}>{project.stat}</span>
        </div>
      </div>
    </motion.div>
  );
}
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgShift = interpolate(frame, [0, 200], [0, -240]);

  const titleOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    from: 20,
    to: 0,
    config: { damping: 14 },
  });

  const steps = [
    { k: "INPUT", v: "Prompt + Brand Kit" },
    { k: "AI", v: "Script + Visual Plan" },
    { k: "DATA", v: "Live API / Dataset" },
    { k: "COMPOSE", v: "Scenes + Transitions" },
    { k: "RENDER", v: "Remotion Engine" },
    { k: "OUTPUT", v: "9:16 / 1:1 / 16:9 Variants" },
  ];

  const base = 25;     // start frame for steps
  const gap = 14;      // delay between steps

  const pulse = 1 + Math.sin(frame / 16) * 0.02;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050510",
        fontFamily: "Inter, sans-serif",
        color: "white",
        padding: 90,
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          width: "220%",
          height: "220%",
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translateY(${bgShift}px)`,
          opacity: 0.55,
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 35%, rgba(56,189,248,0.15), transparent 55%), radial-gradient(circle at 70% 65%, rgba(168,85,247,0.15), transparent 60%)",
          transform: `scale(${pulse})`,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1500, margin: "0 auto" }}>
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >

          <div
            style={{
              marginTop: 10,
              fontSize: 90,
              fontWeight: 950,
              letterSpacing: -2.3,
              background: "linear-gradient(90deg, #a855f7, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            A modular video pipeline.
          </div>
        </div>

        {/* Pipeline */}
        <div style={{ marginTop: 70 }}>
          {steps.map((s, i) => {
            const start = base + i * gap;

            const op = interpolate(frame, [start, start + 10], [0, 1], {
              extrapolateRight: "clamp",
            });

            const x = spring({
              frame: frame - start,
              fps,
              from: -25,
              to: 0,
              config: { damping: 14 },
            });

            const activeGlow = interpolate(frame, [start, start + 18], [0, 1], {
              extrapolateRight: "clamp",
            });

            const accent =
              i === 0 ? "#38bdf8" : i === 1 ? "#a855f7" : i === 2 ? "#22c55e" : "#38bdf8";

            return (
              <div
                key={s.k}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "18px 22px",
                  borderRadius: 18,
                  marginBottom: 14,
                  opacity: op,
                  transform: `translateX(${x}px)`,
                  border: "1px solid rgba(148,163,184,0.14)",
                  background:
                    "linear-gradient(180deg, rgba(15,23,42,0.72), rgba(2,6,23,0.55))",
                  boxShadow: activeGlow
                    ? `0 0 26px rgba(56,189,248,${0.18 * activeGlow})`
                    : "none",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    backgroundColor: accent,
                    boxShadow: `0 0 14px ${accent}`,
                  }}
                />

                <div style={{ width: 140, fontSize: 18, letterSpacing: 1, color: "#94a3b8" }}>
                  {s.k}
                </div>

                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.6 }}>
                  {s.v}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer line */}
        <div
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 26,
            color: "#cbd5e1",
            opacity: interpolate(frame, [120, 160], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          
        </div>
      </div>
    </AbsoluteFill>
  );
};

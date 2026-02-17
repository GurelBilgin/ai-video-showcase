import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const MomentumScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background motion
  const bgShift = interpolate(frame, [0, 180], [0, -220]);

  // Headline
  const headOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headY = spring({
    frame,
    fps,
    from: 30,
    to: 0,
    config: { damping: 14 },
  });

  // Pill cards reveal
  const cardsOpacity = interpolate(frame, [25, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Stagger cards
  const card1 = spring({ frame: frame - 30, fps, from: 0.95, to: 1, config: { damping: 12 } });
  const card2 = spring({ frame: frame - 45, fps, from: 0.95, to: 1, config: { damping: 12 } });
  const card3 = spring({ frame: frame - 60, fps, from: 0.95, to: 1, config: { damping: 12 } });

  const card1Op = interpolate(frame, [28, 42], [0, 1], { extrapolateRight: "clamp" });
  const card2Op = interpolate(frame, [43, 57], [0, 1], { extrapolateRight: "clamp" });
  const card3Op = interpolate(frame, [58, 72], [0, 1], { extrapolateRight: "clamp" });

  // Bottom connector to Finale
  const nextOpacity = interpolate(frame, [120, 165], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(frame / 14) * 0.02;

  const Card = ({
    title,
    desc,
    accent,
    scale,
    opacity,
  }: {
    title: string;
    desc: string;
    accent: string;
    scale: number;
    opacity: number;
  }) => (
    <div
      style={{
        flex: 1,
        padding: "28px 26px",
        borderRadius: 18,
        border: "1px solid rgba(148,163,184,0.14)",
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.75), rgba(2,6,23,0.55))",
        boxShadow: "0 0 40px rgba(0,0,0,0.35)",
        transform: `scale(${scale})`,
        opacity,
        minHeight: 170,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            backgroundColor: accent,
            boxShadow: `0 0 14px ${accent}`,
          }}
        />
        <div style={{ fontSize: 34, fontWeight: 850, letterSpacing: -0.6 }}>
          {title}
        </div>
      </div>

      <div style={{ marginTop: 14, fontSize: 22, color: "#cbd5e1", lineHeight: 1.45 }}>
        {desc}
      </div>
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        color: "white",
        padding: 90,
      }}
    >
      {/* Moving grid background */}
      <div
        style={{
          position: "absolute",
          width: "220%",
          height: "220%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          transform: `translateY(${bgShift}px)`,
          opacity: 0.22,
        }}
      />

      {/* Subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(168,85,247,0.18), transparent 60%), radial-gradient(circle at 65% 55%, rgba(56,189,248,0.14), transparent 62%)",
          transform: `scale(${pulse})`,
        }}
      />

      {/* Content */}
      <div style={{ width: "100%", maxWidth: 1400, zIndex: 3 }}>
        {/* Headline */}
        <div
          style={{
            textAlign: "center",
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
          }}
        >
          <div style={{ fontSize: 26, color: "#94a3b8", letterSpacing: 1 }}>
            
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 96,
              fontWeight: 950,
              letterSpacing: -2.6,
              background: "linear-gradient(90deg, #a855f7, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Momentum — by design.
          </div>
        </div>

        {/* Cards */}
        <div
          style={{
            marginTop: 70,
            display: "flex",
            gap: 20,
            opacity: cardsOpacity,
          }}
        >
          <Card
            title="Speed"
            desc="Generate variations in minutes — no manual timelines."
            accent="#38bdf8"
            scale={card1}
            opacity={card1Op}
          />
          <Card
            title="Consistency"
            desc="Design system + templates keep every cut on-brand."
            accent="#a855f7"
            scale={card2}
            opacity={card2Op}
          />
          <Card
            title="Scale"
            desc="Data-driven content updates automatically — every day."
            accent="#22c55e"
            scale={card3}
            opacity={card3Op}
          />
        </div>

        {/* Connector to Finale */}
        <div
          style={{
            marginTop: 44,
            textAlign: "center",
            fontSize: 24,
            color: "#cbd5e1",
            opacity: nextOpacity,
          }}
        >
          
        </div>
      </div>
    </AbsoluteFill>
  );
};

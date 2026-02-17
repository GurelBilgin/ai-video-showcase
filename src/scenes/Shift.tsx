import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const Shift: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1 (bridge)
  const line1Opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const line1Y = spring({
    frame,
    fps,
    from: 40,
    to: 0,
    config: { damping: 14 },
  });

  // Line 2 (big pivot)
  const line2Opacity = interpolate(frame, [35, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const line2Scale = spring({
    frame: frame - 30,
    fps,
    from: 0.92,
    to: 1,
    config: { damping: 12 },
  });

  // Small connector
  const kickerOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Background motion
  const glow = 0.55 + Math.sin(frame / 18) * 0.08;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at center, #1e1b4b, #000000 70%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 35% 35%, rgba(168,85,247,0.28), transparent 55%), radial-gradient(circle at 70% 65%, rgba(56,189,248,0.18), transparent 60%)",
          opacity: glow,
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          opacity: 0.16,
          transform: `translateY(${interpolate(frame, [0, 180], [0, -140])}px)`,
        }}
      />

      <div style={{ textAlign: "center", zIndex: 2 }}>
        {/* Bridge line */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 650,
            color: "white",
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            letterSpacing: -1,
          }}
        >
          What if the workflow was code…
        </div>

        {/* Pivot line */}
        <div
          style={{
            marginTop: 26,
            fontSize: 118,
            fontWeight: 900,
            letterSpacing: -2.5,
            background: "linear-gradient(90deg, #a855f7, #38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: line2Opacity,
            transform: `scale(${line2Scale})`,
          }}
        >
          and AI composed the scenes?
        </div>

        {/* Connector to AIScene */}
        <div
          style={{
            marginTop: 36,
            fontSize: 26,
            color: "#94a3b8",
            opacity: kickerOpacity,
          }}
        >
          
        </div>
      </div>
    </AbsoluteFill>
  );
};

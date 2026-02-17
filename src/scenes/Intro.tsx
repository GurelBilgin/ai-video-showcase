import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main reveal
  const mainScale = spring({
    frame,
    fps,
    from: 0.92,
    to: 1,
    config: { damping: 12 },
  });

  const mainOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Sub reveal
  const subOpacity = interpolate(frame, [28, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subY = spring({
    frame: frame - 22,
    fps,
    from: 40,
    to: 0,
    config: { damping: 14 },
  });

  // Small kicker line (story connector)
  const kickerOpacity = interpolate(frame, [70, 110], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Background motion
  const gradientShift = interpolate(frame, [0, 180], [0, 360]);
  const bgGlow = 0.6 + Math.sin(frame / 20) * 0.08;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientShift}deg, #0b0b16, #1e1b4b, #312e81)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 35%, rgba(168,85,247,0.35), transparent 55%), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.25), transparent 60%)",
          opacity: bgGlow,
        }}
      />

      {/* Soft grid */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.18,
          transform: `translateY(${interpolate(frame, [0, 180], [0, -120])}px)`,
        }}
      />

      <div style={{ textAlign: "center", zIndex: 2 }}>
        {/* Main */}
        <div
          style={{
            fontSize: 112,
            fontWeight: 800,
            letterSpacing: -2,
            background: "linear-gradient(90deg, #ffffff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: `scale(${mainScale})`,
            opacity: mainOpacity,
          }}
        >
          Video is not rendered.
        </div>

        {/* Sub */}
        <div
          style={{
            marginTop: 18,
            fontSize: 132,
            fontWeight: 900,
            color: "#38bdf8",
            textShadow: "0px 0px 70px rgba(56,189,248,0.55)",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          It’s engineered.
        </div>

        {/* Kicker connector */}
        <div
          style={{
            marginTop: 34,
            fontSize: 28,
            color: "#94a3b8",
            opacity: kickerOpacity,
          }}
        >
          
        </div>
      </div>
    </AbsoluteFill>
  );
};

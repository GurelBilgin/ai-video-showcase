import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main title reveal
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    from: 0.96,
    to: 1,
    config: { damping: 14 },
  });

  // Subline reveal
  const subOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Background subtle movement
  const bgShift = interpolate(frame, [0, 200], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        background: `linear-gradient(${bgShift}deg, #0f172a, #1e1b4b, #000000)`,
      }}
    >
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          padding: "0 120px",
        }}
      >
        {/* MAIN TITLE */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: -2.5,
            background: "linear-gradient(90deg, #a855f7, #38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Video is Engineered.
        </div>

        {/* SUBLINE */}
        <div
          style={{
            marginTop: 32,
            fontSize: 40,
            color: "#94a3b8",
            opacity: subOpacity,
          }}
        >
          Code-driven. Data-powered. AI-native.
        </div>
      </div>
    </AbsoluteFill>
  );
};

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const lines = [
    { text: "Traditional video workflows", color: "white" },
    { text: "are slow.", color: "#ef4444" },
    { text: "are expensive.", color: "#ef4444" },
    { text: "and don’t scale.", color: "#ef4444" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050505",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0), rgba(0,0,0,0.85))",
        }}
      />

      {/* Header connector line */}
      <div
        style={{
          position: "absolute",
          top: 120,
          width: 1200,
          textAlign: "center",
          fontSize: 22,
          color: "#94a3b8",
          opacity: titleOpacity,
        }}
      >
        
      </div>

      <div style={{ textAlign: "center", zIndex: 2 }}>
        {lines.map((line, index) => {
          const delay = 18 + index * 36;

          const opacity = interpolate(frame, [delay, delay + 16], [0, 1], {
            extrapolateRight: "clamp",
          });

          const y = spring({
            frame: frame - delay,
            fps,
            from: 70,
            to: 0,
            config: { damping: 14 },
          });

          // Subtle punch on the red lines
          const punch =
            index === 0
              ? 1
              : 1 +
                Math.sin(
                  interpolate(frame, [delay, delay + 30], [0, Math.PI], {
                    extrapolateRight: "clamp",
                  })
                ) *
                  0.03;

          return (
            <div
              key={index}
              style={{
                fontSize: index === 0 ? 92 : 102,
                fontWeight: index === 0 ? 750 : 850,
                letterSpacing: -1.5,
                color: line.color,
                marginBottom: 18,
                opacity,
                transform: `translateY(${y}px) scale(${punch})`,
                textShadow:
                  line.color === "#ef4444"
                    ? "0px 0px 28px rgba(239,68,68,0.35)"
                    : "none",
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Bottom connector to Shift */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: 1200,
          textAlign: "center",
          fontSize: 24,
          color: "#94a3b8",
          opacity: interpolate(frame, [140, 175], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        
      </div>
    </AbsoluteFill>
  );
};

import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const AIOutputScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    from: 1.03,
    to: 1,
    config: { damping: 16 },
  });

  // Very subtle parallax
  const parallaxY = interpolate(frame, [0, 180], [18, -10], {
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame: frame - 10,
    fps,
    from: 14,
    to: 0,
    config: { damping: 14 },
  });

  const titleOpacity = interpolate(frame, [8, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const badgeOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  const vignetteOpacity = interpolate(frame, [0, 30], [0.9, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050510",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fadeIn,
          transform: `translateY(${parallaxY}px) scale(${scale})`,
        }}
      >
        <Img
          src={staticFile("images/ai-output.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Cinematic overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(2,6,23,0.78), rgba(2,6,23,0.18) 55%, rgba(2,6,23,0.78))",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: vignetteOpacity,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.0), rgba(0,0,0,0.85))",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          padding: 90,
        }}
      >
        <div style={{ maxWidth: 1200 }}>
          <div
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >

            <div
              style={{
                marginTop: 10,
                fontSize: 92,
                fontWeight: 950,
                letterSpacing: -2.2,
                background: "linear-gradient(90deg, #a855f7, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Generated key visual.
            </div>

            <div
              style={{
                marginTop: 18,
                fontSize: 30,
                color: "#cbd5e1",
                lineHeight: 1.35,
              }}
            >
              A brand-ready hero asset — created from a prompt, placed into a
              coded timeline.
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              marginTop: 26,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(148,163,184,0.18)",
              background: "rgba(2,6,23,0.55)",
              opacity: badgeOpacity,
              color: "#94a3b8",
              fontSize: 18,
            }}
          >
            <span style={{ color: "#22c55e" }}>●</span>
            Generated with AI 
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

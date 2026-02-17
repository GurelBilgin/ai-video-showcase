import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const ImpactScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    from: 22,
    to: 0,
    config: { damping: 14 },
  });

  const leftOpacity = interpolate(frame, [18, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const rightOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const dividerGlow = interpolate(frame, [50, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  const leftTime = Math.floor(
    interpolate(frame - 55, [0, 50], [0, 12], { extrapolateRight: "clamp" })
  );
  const rightTime = Math.floor(
    interpolate(frame - 65, [0, 50], [0, 30], { extrapolateRight: "clamp" })
  );

  const leftScale = spring({
    frame: frame - 20,
    fps,
    from: 0.98,
    to: 1,
    config: { damping: 14 },
  });

  const rightScale = spring({
    frame: frame - 35,
    fps,
    from: 0.98,
    to: 1,
    config: { damping: 14 },
  });

  const punchOpacity = interpolate(frame, [95, 135], [0, 1], {
    extrapolateRight: "clamp",
  });

  const bgShift = interpolate(frame, [0, 200], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgShift}deg, #070a14, #0b1024, #000000)`,
        fontFamily: "Inter, sans-serif",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 90,
        overflow: "hidden",
      }}
    >
      {/* Soft vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0), rgba(0,0,0,0.82))",
        }}
      />

      <div style={{ width: "100%", maxWidth: 1500, opacity: enterOpacity }}>
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            transform: `translateY(${titleY}px)`,
          }}
        >
        
          <div
            style={{
              marginTop: 10,
              fontSize: 92,
              fontWeight: 950,
              letterSpacing: -2.4,
              background: "linear-gradient(90deg, #a855f7, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Time compression.
          </div>
        </div>

        {/* Two columns */}
        <div
          style={{
            marginTop: 70,
            display: "flex",
            gap: 22,
            alignItems: "stretch",
            position: "relative",
          }}
        >
          {/* Left: Traditional */}
          <div
            style={{
              flex: 1,
              borderRadius: 20,
              border: "1px solid rgba(148,163,184,0.14)",
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.72), rgba(2,6,23,0.55))",
              padding: 34,
              opacity: leftOpacity,
              transform: `scale(${leftScale})`,
            }}
          >
            <div style={{ fontSize: 18, color: "#94a3b8", letterSpacing: 1 }}>
              TRADITIONAL WORKFLOW
            </div>

            <div style={{ marginTop: 22, display: "grid", gap: 14 }}>
              {["Script", "Edit", "Animate", "Render", "Export"].map((s, i) => {
                const o = interpolate(frame, [25 + i * 8, 40 + i * 8], [0, 1], {
                  extrapolateRight: "clamp",
                });
                return (
                  <div
                    key={s}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 14,
                      backgroundColor: "rgba(2,6,23,0.35)",
                      border: "1px solid rgba(148,163,184,0.10)",
                      opacity: o,
                      fontSize: 22,
                      color: "#e2e8f0",
                    }}
                  >
                    {s}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 26, color: "#ef4444" }}>
              <div style={{ fontSize: 18, letterSpacing: 1 }}>TIME COST</div>
              <div style={{ fontSize: 64, fontWeight: 900, marginTop: 6 }}>
                {leftTime}h+
              </div>
            </div>
          </div>

          {/* Center divider */}
          <div
            style={{
              width: 2,
              backgroundColor: "rgba(148,163,184,0.18)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -60,
                background:
                  "radial-gradient(circle at center, rgba(56,189,248,0.20), transparent 60%)",
                opacity: dividerGlow,
              }}
            />
          </div>

          {/* Right: AI */}
          <div
            style={{
              flex: 1,
              borderRadius: 20,
              border: "1px solid rgba(148,163,184,0.14)",
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.72), rgba(2,6,23,0.55))",
              padding: 34,
              opacity: rightOpacity,
              transform: `scale(${rightScale})`,
            }}
          >
            <div style={{ fontSize: 18, color: "#94a3b8", letterSpacing: 1 }}>
              AI WORKFLOW
            </div>

            <div style={{ marginTop: 22, display: "grid", gap: 14 }}>
              {["Prompt", "Compile", "Preview", "Publish"].map((s, i) => {
                const o = interpolate(frame, [38 + i * 8, 52 + i * 8], [0, 1], {
                  extrapolateRight: "clamp",
                });
                return (
                  <div
                    key={s}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 14,
                      background:
                        "linear-gradient(90deg, rgba(168,85,247,0.20), rgba(56,189,248,0.12))",
                      border: "1px solid rgba(148,163,184,0.10)",
                      opacity: o,
                      fontSize: 22,
                      color: "#e2e8f0",
                    }}
                  >
                    {s}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 26, color: "#22c55e" }}>
              <div style={{ fontSize: 18, letterSpacing: 1 }}>TIME COST</div>
              <div style={{ fontSize: 64, fontWeight: 900, marginTop: 6 }}>
                {rightTime}s
              </div>
            </div>
          </div>
        </div>

        {/* Punchline */}
        <div
          style={{
            marginTop: 34,
            textAlign: "center",
            fontSize: 26,
            color: "#cbd5e1",
            opacity: punchOpacity,
          }}
        >
          
        </div>
      </div>
    </AbsoluteFill>
  );
};

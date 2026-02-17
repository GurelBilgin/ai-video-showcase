import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const PreviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene pacing
  const uiOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const uiScale = spring({
    frame,
    fps,
    from: 0.985,
    to: 1,
    config: { damping: 14 },
  });

  // "Compiling..." top bar progress (no spinner)
  const progress = interpolate(frame, [10, 95], [0, 1], {
    extrapolateRight: "clamp",
  });

  const progressWidth = `${Math.floor(progress * 100)}%`;

  // Preview viewport reveal
  const previewOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Timeline items highlight sweep
  const sweep = interpolate(frame, [70, 150], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fake playhead motion
  const playheadX = interpolate(frame, [80, 170], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Connection line to Momentum
  const nextOpacity = interpolate(frame, [160, 210], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle background motion
  const bgShift = interpolate(frame, [0, 220], [0, -120]);

  const clips = [
    { label: "INTRO", frames: 180 },
    { label: "PROBLEM", frames: 200 },
    { label: "SHIFT", frames: 180 },
    { label: "AI ENGINE", frames: 220 },
    { label: "LIVE DATA", frames: 220 },
  ];

  const totalFrames = clips.reduce((a, c) => a + c.frames, 0);

  // Convert playheadX -> current time label
  const currentFrame = Math.floor(playheadX * totalFrames);
  const seconds = Math.floor(currentFrame / fps);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <AbsoluteFill
      style={{
        background: "#070a14",
        fontFamily: "Inter, sans-serif",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translateY(${bgShift}px)`,
          opacity: 0.8,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0), rgba(0,0,0,0.8))",
        }}
      />

      {/* App frame */}
      <div
        style={{
          position: "relative",
          width: 1500,
          height: 850,
          margin: "auto",
          top: 70,
          borderRadius: 22,
          border: "1px solid rgba(148,163,184,0.16)",
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.92), rgba(2,6,23,0.92))",
          boxShadow: "0 0 80px rgba(56,189,248,0.12)",
          opacity: uiOpacity,
          transform: `scale(${uiScale})`,
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            height: 64,
            padding: "0 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(148,163,184,0.14)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: "#ef4444",
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: "#f59e0b",
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: "#22c55e",
                  opacity: 0.9,
                }}
              />
            </div>

            <div style={{ fontSize: 18, color: "#cbd5e1", letterSpacing: 0.3 }}>
              Preview Cut — compiling scenes
            </div>
          </div>

          <div style={{ fontSize: 16, color: "#94a3b8" }}>
            {mm}:{ss} / 01:00
          </div>
        </div>

        {/* Progress bar (no spinner) */}
        <div
          style={{
            height: 6,
            backgroundColor: "rgba(148,163,184,0.12)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: progressWidth,
              background: "linear-gradient(90deg, #a855f7, #38bdf8)",
              transition: "width 150ms linear",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ display: "flex", height: "calc(100% - 70px)" }}>
          {/* Left panel */}
          <div
            style={{
              width: 340,
              borderRight: "1px solid rgba(148,163,184,0.12)",
              padding: 22,
            }}
          >
            <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 12 }}>
              PIPELINE
            </div>

            {[
              { k: "Prompt", v: "Launch video from code + AI" },
              { k: "Script", v: "Generated" },
              { k: "Design", v: "Brand system applied" },
              { k: "Data", v: "Live overlays injected" },
              { k: "Timeline", v: "Auto composed" },
            ].map((row, idx) => {
              const rowOpacity = interpolate(frame, [20 + idx * 10, 40 + idx * 10], [0, 1], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={row.k}
                  style={{
                    padding: "14px 14px",
                    borderRadius: 14,
                    marginBottom: 12,
                    border: "1px solid rgba(148,163,184,0.10)",
                    backgroundColor: "rgba(2,6,23,0.35)",
                    opacity: rowOpacity,
                  }}
                >
                  <div style={{ fontSize: 16, color: "#e2e8f0" }}>{row.k}</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>
                    {row.v}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right panel */}
          <div style={{ flex: 1, padding: 22 }}>
            {/* Preview viewport */}
            <div
              style={{
                height: 420,
                borderRadius: 18,
                border: "1px solid rgba(148,163,184,0.14)",
                background:
                  "radial-gradient(circle at 30% 35%, rgba(56,189,248,0.22), transparent 55%), radial-gradient(circle at 70% 65%, rgba(168,85,247,0.18), transparent 60%), rgba(2,6,23,0.55)",
                boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.6)",
                position: "relative",
                overflow: "hidden",
                opacity: previewOpacity,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  top: 20,
                  fontSize: 14,
                  color: "#cbd5e1",
                  letterSpacing: 0.6,
                }}
              >
                PREVIEW OUTPUT
              </div>

              {/* Fake content bars */}
              {Array.from({ length: 6 }).map((_, i) => {
                const w = 62 + (i % 3) * 10;
                const barOpacity = interpolate(frame, [50 + i * 6, 75 + i * 6], [0, 1], {
                  extrapolateRight: "clamp",
                });

                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: 60,
                      top: 90 + i * 44,
                      height: 12,
                      width: `${w}%`,
                      borderRadius: 999,
                      backgroundColor: "rgba(226,232,240,0.18)",
                      opacity: barOpacity,
                    }}
                  />
                );
              })}

              {/* Mini badge */}
              <div
                style={{
                  position: "absolute",
                  right: 22,
                  bottom: 18,
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(148,163,184,0.14)",
                  backgroundColor: "rgba(2,6,23,0.45)",
                  color: "#94a3b8",
                  fontSize: 14,
                }}
              >
                ready for timeline
              </div>
            </div>

            {/* Timeline */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 10 }}>
                TIMELINE
              </div>

              <div
                style={{
                  height: 140,
                  borderRadius: 18,
                  border: "1px solid rgba(148,163,184,0.14)",
                  backgroundColor: "rgba(2,6,23,0.35)",
                  padding: 16,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Clips */}
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {clips.map((c, idx) => {
                    const w = (c.frames / totalFrames) * 100;
                    const active = sweep > idx / clips.length;

                    const clipOpacity = interpolate(
                      frame,
                      [55 + idx * 8, 85 + idx * 8],
                      [0, 1],
                      { extrapolateRight: "clamp" }
                    );

                    return (
                      <div
                        key={c.label}
                        style={{
                          flex: `${w} 0 0`,
                          height: 70,
                          borderRadius: 14,
                          border: "1px solid rgba(148,163,184,0.14)",
                          background: active
                            ? "linear-gradient(90deg, rgba(168,85,247,0.30), rgba(56,189,248,0.20))"
                            : "rgba(15,23,42,0.45)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          color: "#e2e8f0",
                          letterSpacing: 1.2,
                          opacity: clipOpacity,
                        }}
                      >
                        {c.label}
                      </div>
                    );
                  })}
                </div>

                {/* Playhead */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    bottom: 10,
                    left: `${clamp(playheadX * 100, 0, 100)}%`,
                    width: 2,
                    backgroundColor: "rgba(56,189,248,0.8)",
                    boxShadow: "0 0 18px rgba(56,189,248,0.6)",
                    transform: "translateX(-1px)",
                    opacity: interpolate(frame, [80, 95], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                  }}
                />
              </div>
            </div>

            {/* Connector */}
            <div
              style={{
                marginTop: 16,
                textAlign: "center",
                fontSize: 22,
                color: "#cbd5e1",
                opacity: nextOpacity,
              }}
            >
              
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

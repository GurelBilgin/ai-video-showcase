import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const AIScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -----------------------------
  // Prompt reveal (ties from Shift)
  // -----------------------------
  const promptOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateRight: "clamp",
  });

  // -----------------------------
  // Typing animation (pipeline style)
  // -----------------------------
  const script =
    "Initializing generative engine...\nParsing prompt...\nDesigning visual hierarchy...\nComposing motion timeline...\nInjecting brand system...\nScheduling render tasks...";

  const typingLength = Math.floor(
    interpolate(frame - 30, [0, 135], [0, script.length], {
      extrapolateRight: "clamp",
    })
  );

  const typedText = script.slice(0, typingLength);
  const cursorOpacity = frame % 20 < 10 ? 1 : 0;

  // -----------------------------
  // Code Generation Block
  // -----------------------------
  const codeOpacity = interpolate(frame, [150, 185], [0, 1], {
    extrapolateRight: "clamp",
  });

  const codeScale = spring({
    frame: frame - 150,
    fps,
    from: 0.96,
    to: 1,
    config: { damping: 14 },
  });

  // Subtle glow behind code
  const glowOpacity = interpolate(frame, [145, 175], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Connector to Pipeline/Data
  const nextOpacity = interpolate(frame, [190, 215], [0, 1], {
    extrapolateRight: "clamp",
  });

  const nextY = spring({
    frame: frame - 190,
    fps,
    from: 10,
    to: 0,
    config: { damping: 16 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050510",
        fontFamily: "Inter, monospace",
        color: "#38bdf8",
        justifyContent: "center",
        alignItems: "center",
        padding: 120,
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
            "linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translateY(${interpolate(frame, [0, 220], [0, -180])}px)`,
        }}
      />

      {/* Soft vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0), rgba(0,0,0,0.75))",
        }}
      />

      <div style={{ width: "100%", maxWidth: 1100, zIndex: 10 }}>
        {/* Prompt */}
        <div
          style={{
            fontSize: 34,
            opacity: promptOpacity,
            color: "#cbd5e1",
          }}
        >
          {">"} Compose a product launch video from code + AI
        </div>

        {/* Typing Output */}
        <div
          style={{
            marginTop: 34,
            fontSize: 28,
            lineHeight: 1.6,
            minHeight: 220,
            whiteSpace: "pre-line",
            color: "#38bdf8",
          }}
        >
          {typedText}
          <span style={{ opacity: cursorOpacity }}>|</span>
        </div>

        {/* Code Block Wrapper (glow effect) */}
        <div style={{ position: "relative", marginTop: 44 }}>
          {/* Glow layer */}
          <div
            style={{
              position: "absolute",
              inset: -18,
              borderRadius: 22,
              background:
                "radial-gradient(circle at 30% 20%, rgba(56,189,248,0.28), transparent 55%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.18), transparent 60%)",
              opacity: glowOpacity,
              filter: "blur(10px)",
            }}
          />

          {/* Code Block */}
          <div
            style={{
              position: "relative",
              backgroundColor: "#0f172a",
              padding: 36,
              borderRadius: 18,
              fontSize: 22,
              color: "#22c55e",
              opacity: codeOpacity,
              transform: `scale(${codeScale})`,
              border: "1px solid rgba(148,163,184,0.16)",
              whiteSpace: "pre-wrap",
            }}
          >
            {`<Pipeline>
  <Prompt source="user" />
  <Script model="LLM" />
  <DesignSystem theme="NovaAI" />
  <DataOverlay source="Live API" />
  <Timeline autoCompose />
  <Render target="mp4" />
</Pipeline>`}
          </div>
        </div>

        {/* Connector (to PipelineScene/DataScene) */}
        <div
          style={{
            marginTop: 26,
            fontSize: 20,
            color: "#94a3b8",
            opacity: nextOpacity,
            transform: `translateY(${nextY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ color: "#22c55e" }}>●</span>
          LIVE INPUT READY — connecting to pipeline & data feed…
        </div>
      </div>
    </AbsoluteFill>
  );
};

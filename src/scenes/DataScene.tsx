import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const DataScene: React.FC<{ price: number }> = ({ price }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fallback (API gelmemişse sahne boş kalmasın)
  const safePrice = price && price > 0 ? price : 64250;

  // -------------------------
  // Simulated previous price (for delta)
  // -------------------------
  const previousPrice = safePrice * 0.97; // mock 3% change
  const changePercent = ((safePrice - previousPrice) / previousPrice) * 100;
  const isPositive = changePercent >= 0;
  const changeColor = isPositive ? "#22c55e" : "#ef4444";

  // -------------------------
  // HEADER (story connector)
  // -------------------------
  const headerOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headerY = spring({
    frame,
    fps,
    from: 18,
    to: 0,
    config: { damping: 16 },
  });

  // -------------------------
  // KPI (overlay reveal)
  // -------------------------
  const kpiScale = spring({
    frame: frame - 10,
    fps,
    from: 0.98,
    to: 1,
    config: { damping: 14 },
  });

  const animatedPrice = Math.floor(
    interpolate(frame - 30, [0, 70], [previousPrice, safePrice], {
      extrapolateRight: "clamp",
    })
  );

  const animatedChange = interpolate(frame - 55, [0, 70], [0, changePercent], {
    extrapolateRight: "clamp",
  });

  // -------------------------
  // GRAPH
  // -------------------------
  const width = 980;
  const height = 260;
  const points = 52;

  const dataPoints = Array.from({ length: points }).map((_, i) => {
    const x = (i / (points - 1)) * width;

    const volatility =
      Math.sin((frame / 14 + i) * 0.42) * 24 + Math.sin(i * 0.65) * 10;

    const trend = (i / points) * (isPositive ? -58 : 58);
    const y = height / 2 + volatility + trend;

    return { x, y };
  });

  const path = dataPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;

  const pathLength = 3200;
  const drawProgress = interpolate(frame, [35, 130], [pathLength, 0], {
    extrapolateRight: "clamp",
  });

  const graphOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  // -------------------------
  // TICKER (now video-themed)
  // -------------------------
  const tickerX = interpolate(frame, [0, 420], [0, -1400], {
    extrapolateRight: "extend",
  });

  // Connector to PreviewScene
  const nextOpacity = interpolate(frame, [160, 210], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0f1f",
        fontFamily: "Inter, sans-serif",
        color: "white",
        padding: 80,
        overflow: "hidden",
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.9,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0), rgba(0,0,0,0.75))",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 12px #22c55e",
            }}
          />
          <div style={{ fontSize: 20, color: "#22c55e", letterSpacing: 1 }}>
            LIVE DATA OVERLAY
          </div>
        </div>

        <div style={{ fontSize: 20, color: "#38bdf8", letterSpacing: 1 }}>
          COMPOSED IN CODE
        </div>
      </div>

      {/* Main KPI Overlay */}
      <div
        style={{
          position: "relative",
          marginTop: 90,
          textAlign: "center",
          transform: `scale(${kpiScale})`,
        }}
      >

        <div style={{ fontSize: 140, fontWeight: 900, marginTop: 18 }}>
          ${animatedPrice.toLocaleString()}
        </div>

        <div
          style={{
            fontSize: 40,
            marginTop: 10,
            color: changeColor,
            fontWeight: 700,
          }}
        >
          {isPositive ? "▲" : "▼"} {animatedChange.toFixed(2)}%
        </div>

        <div style={{ fontSize: 24, marginTop: 10, color: "#94a3b8" }}>
          Live API → motion-ready lower third
        </div>
      </div>

      {/* Graph */}
      <div
        style={{
          position: "relative",
          marginTop: 70,
          display: "flex",
          justifyContent: "center",
          opacity: graphOpacity,
        }}
      >
        <svg width={width} height={height}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={changeColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={changeColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#areaGradient)" />

          <path
            d={path}
            fill="none"
            stroke={changeColor}
            strokeWidth="4"
            strokeDasharray={pathLength}
            strokeDashoffset={drawProgress}
          />
        </svg>
      </div>

      {/* Ticker (video-focused, not finance-focused) */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: tickerX,
          fontSize: 24,
          whiteSpace: "nowrap",
          color: "#94a3b8",
        }}
      >
        DATA → OVERLAY → TIMELINE &nbsp;&nbsp; | &nbsp;&nbsp; AUTO-UPDATED METRICS
        &nbsp;&nbsp; | &nbsp;&nbsp; LOWER THIRDS GENERATED &nbsp;&nbsp; | &nbsp;&nbsp;
        MOTION SAFE ZONES OK &nbsp;&nbsp; | &nbsp;&nbsp; READY FOR PREVIEW &nbsp;&nbsp;
      </div>

      {/* Connector to PreviewScene */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          width: "100%",
          left: 0,
          textAlign: "center",
          fontSize: 24,
          color: "#cbd5e1",
          opacity: nextOpacity,
        }}
      >
        
      </div>
    </AbsoluteFill>
  );
};

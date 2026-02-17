import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  Audio,
  staticFile,
  delayRender,
  continueRender,
} from "remotion";

import { useEffect, useRef, useState } from "react";

import { Intro } from "./Intro";
import { Problem } from "./Problem";
import { Shift } from "./Shift";
import { AIScene } from "./AIScene";
import { AIOutputScene } from "./AIOutputScene";
import { PipelineScene } from "./PipelineScene";
import { DataScene } from "./DataScene";
import { PreviewScene } from "./PreviewScene";
import { MomentumScene } from "./MomentumScene";
import { ImpactScene } from "./ImpactScene";
import { Finale } from "./Finale";

export const Master: React.FC = () => {
  const frame = useCurrentFrame();

  // =========================
  // API FETCH (RENDER-SAFE)
  // =========================
  const [btcPrice, setBtcPrice] = useState<number>(65000);

  // delayRender handle must be created ONCE
  const handleRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  if (handleRef.current === null) {
    handleRef.current = delayRender("Fetching BTC price");
  }

  useEffect(() => {
    let cancelled = false;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      if (handleRef.current !== null) {
        continueRender(handleRef.current);
      }
    };

    fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const parsed = Number.parseFloat(data?.price);
        if (Number.isFinite(parsed)) {
          setBtcPrice(parsed);
        } else {
          setBtcPrice(65000);
        }
        finish();
      })
      .catch((err) => {
        console.error("API Error:", err);
        if (!cancelled) setBtcPrice(65000);
        finish();
      });

    return () => {
      cancelled = true;
      // In case unmount happens before fetch resolves, release render
      finish();
    };
  }, []);

  // =========================
  // DURATIONS
  // =========================
  const intro = 180;
  const problem = 200;
  const shift = 180;
  const ai = 220;

  const aiOutput = 180;

  const pipeline = 180;
  const data = 220;
  const preview = 200;
  const momentum = 180;
  const impact = 200;
  const finale = 180;

  // =========================
  // TIMELINE (AUTO)
  // =========================
  const t0 = 0;
  const t1 = t0 + intro;
  const t2 = t1 + problem;
  const t3 = t2 + shift;
  const t4 = t3 + ai;

  const t5 = t4 + aiOutput;     // AIOutput start
  const t6 = t5 + pipeline;     // Pipeline start
  const t7 = t6 + data;         // Data start
  const t8 = t7 + preview;      // Preview start
  const t9 = t8 + momentum;     // Momentum start
  const t10 = t9 + impact;      // Impact start

  // =========================
  // FADE TRANSITIONS (AUTO)
  // =========================
  const cuts = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];
  const fades = cuts.map((cut) =>
    interpolate(frame, [cut - 10, cut, cut + 10], [0, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const totalFade = Math.max(...fades);

  return (
    <AbsoluteFill>
      {/* Background Music */}
      <Audio src={staticFile("audio/epic-cinematic-trailer.mp3")} volume={0.5} />

      <Sequence from={t0} durationInFrames={intro}>
        <Intro />
      </Sequence>

      <Sequence from={t1} durationInFrames={problem}>
        <Problem />
      </Sequence>

      <Sequence from={t2} durationInFrames={shift}>
        <Shift />
      </Sequence>

      <Sequence from={t3} durationInFrames={ai}>
        <AIScene />
      </Sequence>

      <Sequence from={t4} durationInFrames={aiOutput}>
        <AIOutputScene />
      </Sequence>

      <Sequence from={t5} durationInFrames={pipeline}>
        <PipelineScene />
      </Sequence>

      <Sequence from={t6} durationInFrames={data}>
        <DataScene price={btcPrice} />
      </Sequence>

      <Sequence from={t7} durationInFrames={preview}>
        <PreviewScene />
      </Sequence>

      <Sequence from={t8} durationInFrames={momentum}>
        <MomentumScene />
      </Sequence>

      <Sequence from={t9} durationInFrames={impact}>
        <ImpactScene />
      </Sequence>

      <Sequence from={t10} durationInFrames={finale}>
        <Finale />
      </Sequence>

      {/* Fade Layer */}
      <AbsoluteFill
        style={{
          backgroundColor: "black",
          pointerEvents: "none",
          opacity: totalFade,
        }}
      />
    </AbsoluteFill>
  );
};

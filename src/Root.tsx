import { Composition } from "remotion";
import { Master } from "./scenes/Master";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AIShowcaseMaster"
        component={Master}
        durationInFrames={2120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

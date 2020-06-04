import React, { useEffect } from 'react';
import Race from './canvas/App';

let race;

export function RacingComponent({ ranking }) {
  const pixiRef = React.createRef();

  useEffect(() => {
    if (!race) {
      race = new Race();
      pixiRef.current.appendChild(race.view);
    }

    return () => {
      race.destroy();
      race = null;
    };
  }, [pixiRef]);

  useEffect(() => {
    if (race.initialized()) {
      race.start();
      setTimeout(() => race.finish(ranking.split(',')), 10000);
    }
    // 起跑，並在10秒後通過終點
    // ex: canvasAPI.start({ prevWinNum: prevHistory.get('winNum) });
  }, [ranking]);

  return <div ref={pixiRef} />;
}

export default RacingComponent;

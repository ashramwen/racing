import React, { useCallback, useEffect } from 'react';
import Race from './canvas';

const racingTime = 20000;
let race;

const RacingComponent = ({ ranking }) => {
  const pixiRef = React.createRef();

  const verify = useCallback((standings) => {
    if (standings.length !== 10) return false;

    return !standings.find((o) => {
      const n = Number(o);
      return !Number.isInteger(Number(n)) || n > 10 || n < 0;
    });
  }, []);

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
    const standings = ranking?.split(',');
    if (!verify(standings)) return;

    race.init();
    // if (race.initialized()) {
    race.start();
    setTimeout(() => race.finish(standings), racingTime);
    // }
    // 起跑，並在10秒後通過終點
    // ex: canvasAPI.start({ prevWinNum: prevHistory.get('winNum) });
  }, [verify, ranking]);

  return (
    <>
      <div className="canvas" ref={pixiRef} />
    </>
  );
};

export default RacingComponent;

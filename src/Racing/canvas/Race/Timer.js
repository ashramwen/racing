import * as PIXI from 'pixi.js';

const baseUrl = `${process.env.PUBLIC_URL}/game/race/racing/timer/`;

const Timer = () => {
  let angle = 270;
  const timerContainer = new PIXI.Container({
    antialias: true,
  });
  timerContainer.name = 'Timer';

  const timers = [];
  const numbers = [];
  for (let i = 0; i < 6; i++) {
    const t = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}red${i}.png`));
    t.x = 440;
    timers.push(t);

    const num = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}${i}.png`));
    num.x = 546;
    num.y = 265;
    num.visible = false;
    numbers.push(num);
  }

  const mask = new PIXI.Graphics();
  mask.lineStyle(12, 0xff3300);
  mask.arc(577, 315, 90, -90 * PIXI.DEG_TO_RAD, angle * PIXI.DEG_TO_RAD);

  const circle = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}circle.png`));
  circle.x = 485;
  circle.y = 222;
  circle.visible = false;
  circle.mask = mask;

  const eclipse = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}eclipse.png`));
  eclipse.x = 485;
  eclipse.y = 222;
  eclipse.visible = false;

  const start = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}start.png`));
  start.x = 443;
  start.y = 285;
  start.visible = false;

  timerContainer.addChild(...timers, eclipse, circle, mask, ...numbers, start);

  timerContainer.start = () => {
    numbers[5].visible = true;
    circle.visible = true;
    eclipse.visible = true;

    let initialTimer = new Date().valueOf();
    const go = () =>
      setTimeout(() => {
        const delta =
          5 - Math.floor((new Date().valueOf() - initialTimer) / 1000);
        for (let ind = 0; ind <= 6; ind++) {
          numbers[ind] && (numbers[ind].visible = ind === delta);
          timers[ind] && (timers[ind].visible = ind === delta);
        }
        if (delta === -1) {
          eclipse.visible = false;
          start.visible = true;
          go();
        } else if (delta < -1) {
          eclipse.visible = false;
          start.visible = false;
        } else {
          go();
        }
      }, 100);
    go();

    let initialCircleTimer = new Date().valueOf();
    const circleRun = () =>
      setTimeout(() => {
        const delta = Math.floor(new Date().valueOf() - initialCircleTimer);
        angle = -0.072 * delta + 270;
        mask.clear();
        mask.lineStyle(12, 0xff3300);
        mask.arc(577, 315, 90, -90 * PIXI.DEG_TO_RAD, angle * PIXI.DEG_TO_RAD);
        if (angle <= -90) {
          circle.visible = false;
        } else {
          circleRun();
        }
      }, 10);
    circleRun();
  };

  timerContainer.init = () => {
    timers.forEach(o => (o.visible = true));
    numbers.forEach(o => (o.visible = false));
  };

  return timerContainer;
};

export default Timer;

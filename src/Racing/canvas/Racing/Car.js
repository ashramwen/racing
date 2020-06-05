import * as PIXI from 'pixi.js';

import { PixiPlugin, TweenMax, Back } from 'gsap/all';

// eslint-disable-next-line no-unused-vars
const plugins = [PixiPlugin];

const baseUrl = `${process.env.PUBLIC_URL}/race/racing/car/`;

const MIN_X = 600;
const MAX_X = 850;

const LAST_MIN_X = 550;
const LAST_MAX_X = 700;

const MAX_SPEED = 4;
const MIN_SPEED = 8;

const getRandomInt = (min = MIN_X, max = MAX_X) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 *
 *
 * @param {*} index
 * @returns
 */
function Car(index) {
  let moving = Math.random() >= 0.5;
  let speed = getRandomInt(MAX_SPEED, MIN_SPEED);
  let _x = getRandomInt();
  let tween;

  const pow = Math.pow(0.98, 10 - index);

  const carContainer = new PIXI.Container({
    antialias: true,
  });
  carContainer.name = `Car${index}`;
  carContainer.x = 1000 - index * 5.5;
  carContainer.y = index * 45 + 170;
  // carContainer.y = i * 46 + (moving ? 165 : 163);

  const t = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}turbo0.png`));
  t.scale.set(pow, pow);
  t.x = 151 * pow;
  t.y = 25 * pow;
  t.visible = false;

  const t1 = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}turbo1.png`));
  t1.scale.set(pow, pow);
  t1.x = 151 * pow;
  t1.y = 25 * pow;
  t1.visible = false;

  const t2 = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}turbo2.png`));
  t2.scale.set(pow, pow);
  t2.x = 148 * pow;
  t2.y = 22 * pow;
  t2.visible = false;
  const turbo = [t, t1, t2];

  let gearDelta = 0;
  const gearSpeed = 6;
  const gear1Ticker = new PIXI.ticker.Ticker();
  gear1Ticker.add(() => {
    if (gearDelta === gearSpeed) {
      gearDelta = 0;
      t.visible = true;
      t1.visible = !t1.visible;
    } else {
      gearDelta++;
    }
  });

  const gear2Ticker = new PIXI.ticker.Ticker();
  gear2Ticker.add(() => {
    if (gearDelta === gearSpeed) {
      gearDelta = 0;
      t1.visible = true;
      t2.visible = !t2.visible;
    } else {
      gearDelta++;
    }
  });
  const gearTickers = [gear1Ticker, gear2Ticker];

  const car = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}car${index}.png`));
  car.scale.set(pow, pow);

  const frontWheel = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}wheel.png`));
  frontWheel.anchor.set(0.49);
  frontWheel.scale.set(pow, pow);
  frontWheel.x = 38 * pow;
  frontWheel.y = 25 * pow;

  const rearWheel = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}wheel.png`));
  rearWheel.anchor.set(0.49);
  rearWheel.scale.set(pow, pow);
  rearWheel.x = 130 * pow;
  rearWheel.y = 25 * pow;

  carContainer.addChild(
    turbo[0],
    turbo[1],
    turbo[2],
    car,
    frontWheel,
    rearWheel
  );

  const breaking = () => {
    turbo.forEach((o) => (o.visible = false));
    gearTickers.forEach((o) => o.stop());
  };

  /**
   * carCharging animation
   *
   * @param {*} x
   * @param {*} speed
   * @param {*} onComplete
   * @param {*} onStart
   * @param {*} ease
   * @param {*} delay
   * @returns TweenMax
   */
  const carCharging = (
    x,
    speed,
    onComplete,
    onStart,
    ease = Back.easeInOut,
    delay = 0
  ) => {
    return new TweenMax(carContainer, speed, {
      pixi: { x },
      ease,
      onComplete,
      onStart,
      delay,
    });
  };

  const carMoving = () => {
    const onStart = () => {
      breaking();
      const delta = carContainer.x - _x;
      if (delta > 0) {
        if (_x < MIN_X + 100 || speed === MAX_SPEED) {
          gear2Ticker.start();
        } else if (_x < MIN_X + 200 || speed === MAX_SPEED + 1) {
          gear1Ticker.start();
        }
      }
    };

    const onComplete = () => {
      _x = getRandomInt();
      speed = getRandomInt(MAX_SPEED, MIN_SPEED);

      carMoving();
    };

    tween = carCharging(_x, speed, onComplete, onStart);
  };

  const carShakingTicker = new PIXI.ticker.Ticker();
  let carDelta = 0;
  carShakingTicker.add(() => {
    if (carDelta < 5) {
      carDelta++;
    } else {
      carDelta = 0;
      car.y = car.y + (moving ? -1 : 1);
      moving = !moving;
    }
  });

  carShakingTicker.start();

  const wheelTicker = new PIXI.ticker.Ticker();
  wheelTicker.add(() => {
    frontWheel.rotation -= 0.5;
    rearWheel.rotation -= 0.5;
  });

  carContainer.start = () => {
    carMoving();
    wheelTicker.start();
  };

  carContainer.finish = ({ onComplete }) => {
    tween.kill();
    breaking();
    // tween.kill();
    // carCharging(-200, 0.4, null, () => gear2Ticker.start());

    tween = carCharging(
      getRandomInt(LAST_MIN_X, LAST_MAX_X),
      5,
      () => {
        gear2Ticker.start();
        tween = carCharging(
          -200,
          0.4,
          () => {
            onComplete && onComplete();
          },
          () => gear2Ticker.start(),
          Back.easeOut,
          1
        );
      },
      () => gear1Ticker.start()
    );
  };

  carContainer.stop = () => {
    wheelTicker.stop();
    carShakingTicker.stop();
    tween.kill();
    breaking();
  };

  carContainer.init = () => {
    breaking();
    wheelTicker.stop();
    tween && tween.kill();
    carContainer.x = 1000 - index * 5.5;
  };

  return carContainer;
}

export default Car;

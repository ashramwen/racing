import * as PIXI from 'pixi.js';
import { PixiPlugin, TweenMax, Power1 } from 'gsap/all';

// eslint-disable-next-line no-unused-vars
const plugins = [PixiPlugin];

const baseUrl = `${process.env.PUBLIC_URL}/game/race/award/car/`;

const WIDTH = 1150 / 2;

const CARS_STATES = [
  {
    initialX: WIDTH,
    expectedX: WIDTH,
    expectedY: 400,
    expectedScale: 1,
  },
  {
    initialX: WIDTH - 10,
    expectedX: WIDTH - 300,
    expectedY: 360,
    expectedScale: 0.9,
  },
  {
    initialX: WIDTH + 10,
    expectedX: WIDTH + 280,
    expectedY: 320,
    expectedScale: 0.8,
  },
];

const CROWN_POS = [
  {
    x: WIDTH,
    y: 225,
  },
  {
    x: WIDTH - 300,
    y: 200,
  },
  {
    x: WIDTH + 280,
    y: 170,
  },
];

const TEXT = ['冠军', '亚军', '季军'];

const Car = ({ onComplete }) => {
  let keys = [38, 38, 40, 40, 37, 39, 37, 39, 65, 66, 65, 66];
  let keyIndex = 0;
  let end = false;

  const carContainer = new PIXI.Container({
    antialias: true,
  });

  let cars = [];
  const allCars = [];
  const crowns = [];
  const numbers = [];

  const miku = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}miku.png`));
  miku.scale.set(0.5, 0.5);
  miku.x = 170;
  miku.y = 140;
  miku.visible = false;

  const showMiku = () => {
    process.env.NODE_ENV !== 'production' && (miku.visible = true);
  };

  window.addEventListener(
    'keydown',
    e => {
      if (e.keyCode === keys[keyIndex]) {
        keyIndex++;
      } else {
        keyIndex = 0;
      }
      if (end && keyIndex === keys.length) {
        showMiku();
      }
    },
    false
  );

  for (let i = 0; i < 10; i++) {
    const car = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}car${i}.png`));
    car.anchor.set(0.5);
    allCars.push(car);
  }

  for (let i = 0; i < 3; i++) {
    const crown = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}crown${i}.png`));
    crown.anchor.set(0.5);
    crown.x = CROWN_POS[i].x;
    crown.y = CROWN_POS[i].y;
    crown.visible = false;
    crowns.push(crown);

    const number = new PIXI.Text(
      '',
      new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 62,
        fontFamily: 'Arial',
      })
    );
    number.y = 10;
    number.anchor.set(0.5);
    numbers.push(number);

    const text = new PIXI.Text(
      TEXT[i],
      new PIXI.TextStyle({
        fill: 0xfae07c,
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular',
      })
    );
    text.y = -25;
    text.anchor.set(0.5);

    crown.addChild(number, text);
  }

  carContainer.addChild(...crowns, miku);

  carContainer.init = (ranking = []) => {
    miku.visible = false;
    keyIndex = 0;
    end = false;

    cars.forEach(o => carContainer.removeChild(o));
    crowns.forEach(o => (o.visible = false));
    cars = [];
    for (let i = 0; i < 3; i++) {
      const car = allCars[+ranking[i] - 1];
      car.x = CARS_STATES[i].initialX;
      car.y = 220;
      car.scale.set(0.1, 0.1);
      cars.push(car);
      carContainer.addChildAt(car, 0);

      numbers[i].text = ranking[i];
    }

    go();
  };

  const go = () => {
    let i = 0;
    TweenMax.to(cars, 0.01, {
      repeat: 3,
      repeatDelay: 0.2,
      onRepeat: () => {
        const _i = i;
        TweenMax.to(cars[i], 3, {
          pixi: {
            scale: CARS_STATES[i].expectedScale,
            x: CARS_STATES[i].expectedX,
            y: CARS_STATES[i].expectedY,
          },
          repeatDelay: 0.5,
          ease: Power1.easeOut,
          onComplete: () => {
            TweenMax.to(cars[_i], 0.1, {
              pixi: {
                y: CARS_STATES[_i].expectedY - 2,
              },
            });
          },
        });
        i++;
      },
      onComplete: () => {
        TweenMax.set(crowns, {
          delay: 3,
          onStart: () => {
            onComplete();
            end = true;
            if (end && keyIndex === keys.length) {
              showMiku();
            }
          },
        });
      },
    });
  };

  // carContainer.go = go;

  carContainer.ranking = () => {
    let i = 1;
    crowns[0].visible = true;
    TweenMax.to(crowns, 0.1, {
      repeat: 2,
      repeatDelay: 0.5,
      onRepeat: () => {
        crowns[i++].visible = true;
      },
    });
  };

  return carContainer;
};

export default Car;

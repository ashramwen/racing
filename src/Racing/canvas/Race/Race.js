import * as PIXI from 'pixi.js';
import Background from './Background';
import Timer from './Timer';
import Car from './Car';

const Race = () => {
  const racingContainer = new PIXI.Container();
  racingContainer.initialized = false;

  const bg = new Background();
  const timer = new Timer();

  let cars = [];
  for (let i = 0; i < 10; i++) {
    const car = new Car(i);
    cars.push(car);
  }

  racingContainer.addChild(bg, ...cars, timer);

  racingContainer.start = () => {
    timer.start();

    let initialTimer = new Date().valueOf();
    const go = () =>
      setTimeout(() => {
        const delta = Math.floor((new Date().valueOf() - initialTimer) / 1000);
        if (delta >= 6) {
          bg.start();
          cars.forEach(o => o.start());
        } else {
          go();
        }
      }, 100);
    go();
  };

  racingContainer.finish = ({ ranking = [], onComplete }) => {
    bg.finish();

    let delta = 4;
    let i = 0;
    const carTicker = new PIXI.ticker.Ticker();
    carTicker.add(() => {
      const index = ranking[i] - 1;
      if (delta < 2) {
        delta++;
      } else {
        if (i === 9) {
          cars[index].finish({ onComplete });
          carTicker.stop();
        } else {
          cars[index].finish({});
        }
        delta = 0;
        i++;
      }
    });
    carTicker.start();
  };

  racingContainer.init = () => {
    racingContainer.initialized = true;
    bg.init();
    timer.init();
    cars.forEach(o => o.init());
  };

  return racingContainer;
};

export default Race;

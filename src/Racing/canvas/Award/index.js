import * as PIXI from 'pixi.js';
import { PixiPlugin, TweenMax } from 'gsap/all';

import Background from './Background';
import Car from './Car';
import Scoreboard from './Scoreboard';

// eslint-disable-next-line no-unused-vars
const plugins = [PixiPlugin];

function Award() {
  const awardContainer = new PIXI.Container();

  const bg = new Background();

  const onComplete = () => {
    bg.fade();
    TweenMax.set(bg, {
      delay: 0.5,
      onComplete: () => {
        bg.spotlight();
        car.ranking();
      },
    });
    // TweenMax.set(bg, {
    //   delay: 0.5,
    //   onComplete: () => car.ranking(),
    // });
    TweenMax.set(bg, {
      delay: 2,
      onComplete: () => scoreboard.go(),
    });
  };

  const car = new Car({ onComplete });

  const scoreboard = new Scoreboard();

  awardContainer.addChild(bg, car, scoreboard);

  awardContainer.init = (ranking = [], issueNum) => {
    bg.init();
    car.init(ranking);
    scoreboard.init(ranking, issueNum);
  };

  return awardContainer;
}

export default Award;

import * as PIXI from 'pixi.js';
import { PixiPlugin, TweenMax } from 'gsap/all';

// eslint-disable-next-line no-unused-vars
const plugins = [PixiPlugin];

const baseUrl = `${process.env.PUBLIC_URL}/race/award/scene/`;

function Scoreboard() {
  const numbers = [];
  const scoreboardContainer = new PIXI.Container();

  const sprite = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}scoreboard.png`));
  sprite.y = 630;

  for (let i = 0; i < 10; i++) {
    const number = new PIXI.Text(
      '',
      new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 28,
        fontFamily: 'Arial',
      })
    );
    number.x = 466 + i * 54.95;
    number.y = 40;
    number.anchor.set(0.5);
    numbers.push(number);
  }
  const text = new PIXI.Text(
    '',
    new PIXI.TextStyle({
      fill: 0xffffff,
      fontSize: 16,
      fontFamily: 'PingFangSC-Regular',
    })
  );
  text.x = 180;
  text.y = 27;

  sprite.addChild(text, ...numbers);

  scoreboardContainer.addChild(sprite);

  scoreboardContainer.init = (ranking) => {
    sprite.y = 630;

    text.text = `比賽結果`;

    ranking.forEach((o, i) => {
      numbers[i].text = o;
    });
  };

  scoreboardContainer.go = () => {
    TweenMax.to(sprite, 0.5, {
      pixi: { y: 560 },
    });
  };

  return scoreboardContainer;
}

export default Scoreboard;

import * as PIXI from 'pixi.js';

const baseUrl = `${process.env.PUBLIC_URL}/game/race/award/scene/`;

const Background = () => {
  const bgContainer = new PIXI.Container({
    antialias: true,
  });

  const bg = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}bg.png`));

  const dark = new PIXI.Graphics();
  dark.beginFill(0x000000);
  dark.drawRect(0, 0, 1150, 630);
  dark.endFill();
  dark.alpha = 0.7;
  dark.visible = false;

  const mask = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}mask_min.png`));
  mask.visible = false;

  const filter = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}filter.png`));
  filter.visible = false;

  bgContainer.addChild(bg, mask, filter);

  bgContainer.init = () => {
    mask.visible = false;
    filter.visible = false;
  };

  bgContainer.fade = () => {
    mask.visible = true;
  };

  bgContainer.spotlight = () => {
    filter.visible = true;
  };

  return bgContainer;
};

export default Background;

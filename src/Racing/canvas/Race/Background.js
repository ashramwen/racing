import * as PIXI from 'pixi.js';
import { PixiPlugin, TweenMax, Power1 } from 'gsap/all';

// eslint-disable-next-line no-unused-vars
const plugins = [PixiPlugin];
const baseUrl = `${process.env.PUBLIC_URL}/game/race/racing/scene/`;

function Background() {
  let finishing = false;

  const bgContainer = new PIXI.Container();
  bgContainer.name = 'Background';

  const sky = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}sky.png`));

  const cloud0 = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}cloud0.png`),
    1150,
    34
  );
  cloud0.y = 10;

  const cloud1 = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}cloud1.png`),
    1150,
    29
  );
  cloud1.y = 41;

  const cloud2 = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}cloud2.png`),
    1150,
    33
  );
  cloud2.y = 16;

  const cloud3 = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}cloud3.png`),
    1150,
    34
  );
  cloud3.y = 22;

  const cloud4 = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}cloud4.png`),
    1150,
    51
  );
  cloud4.y = 14;

  const building = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}building.png`),
    1150,
    90
  );
  building.y = 27;

  const ocean = new PIXI.Sprite(PIXI.Texture.from(`${baseUrl}ocean.png`));
  ocean.y = 109;

  const water = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}water.png`),
    1150,
    20
  );
  water.y = 112;

  const grass = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}grass.png`),
    1150,
    65
  );
  grass.y = 85;

  const fence = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}fence.png`),
    1150,
    25
  );
  fence.y = 145;

  const boundary = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}boundary.png`),
    1150,
    4
  );
  boundary.y = 170;

  const boundary2 = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}boundary2.png`),
    1150,
    6
  );
  boundary2.y = 624;
  bgContainer.addChild(boundary2);

  const roadTilingSprite = new PIXI.TilingSprite(
    PIXI.Texture.from(`${baseUrl}road.png`),
    1150,
    361
  );
  roadTilingSprite.y = 220;
  roadTilingSprite.scale.x = 2;

  const startingLine = new PIXI.Sprite(
    PIXI.Texture.from(`${baseUrl}starting_line.png`)
  );
  startingLine.x = 900;
  startingLine.y = 174;

  bgContainer.addChild(
    sky,
    // cloud,
    cloud0,
    cloud1,
    cloud2,
    cloud3,
    cloud4,
    building,
    ocean,
    water,
    grass,
    fence,
    roadTilingSprite,
    startingLine,
    boundary,
    boundary2
  );

  let startingLineSpeed = 15;
  const ticker = new PIXI.ticker.Ticker();
  ticker.add(() => {
    cloud0.tilePosition.x += 1.1;
    cloud1.tilePosition.x += 1.2;
    cloud2.tilePosition.x += 1.3;
    cloud3.tilePosition.x += 1.4;
    cloud4.tilePosition.x += 1.5;
    building.tilePosition.x += 2;
    water.tilePosition.x += 3;
    grass.tilePosition.x += 10;
    fence.tilePosition.x += 10;
    boundary.tilePosition.x += 30;
    boundary2.tilePosition.x += 30;
    roadTilingSprite.tilePosition.x += 20;

    if (finishing && startingLine.x >= -100) {
      ending();
    } else {
      startingLine.x += startingLineSpeed;
    }
    if (finishing && startingLine.x >= 100) {
      ticker.stop();
    }
  });

  const ending = () => {
    // TweenMax.to(building, 1, {
    //   pixi: { tilePosition: { x: building.tilePosition.x + 10 } }
    // });
    // TweenMax.to(water, 1, {
    //   pixi: { tilePosition: { x: water.tilePosition.x + 15 } }
    // });
    // TweenMax.to(grass, 1, {
    //   pixi: { tilePosition: { x: grass.tilePosition.x + 50 } }
    // });
    // TweenMax.to(fence, 1, {
    //   pixi: { tilePosition: { x: fence.tilePosition.x + 50 } }
    // });
    // TweenMax.to(boundary, 1, {
    //   pixi: { tilePosition: { x: boundary.tilePosition.x + 150 } }
    // });
    // TweenMax.to(boundary2, 1, {
    //   pixi: {
    //     tilePosition: () => {
    //       const tilePosition = { ...boundary2.tilePosition };
    //       tilePosition.x += 150;
    //       return tilePosition;
    //     }
    //   }
    // });
    // TweenMax.to(roadTilingSprite, 1, {
    //   pixi: { tilePosition: { x: roadTilingSprite.tilePosition.x + 100 } }
    // });
    TweenMax.to(startingLine, 1, {
      pixi: { x: startingLine.x + 150 },
      ease: Power1.easeOut,
    });
  };

  bgContainer.start = () => {
    ticker.start();
    finishing = false;
    startingLineSpeed = 15;
    startingLine.x = 900;
  };

  bgContainer.finish = () => {
    finishing = true;
    startingLineSpeed = 30;
    startingLine.x = -8700;
  };

  bgContainer.init = () => {
    ticker.stop();
    finishing = false;
    startingLineSpeed = 15;
    startingLine.x = 900;
  };

  return bgContainer;
}

export default Background;

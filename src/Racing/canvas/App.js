import * as PIXI from 'pixi.js';
import Race from './Race';
import Award from './Award';

function App() {
  let _issueNum;
  const app = new PIXI.Application({
    width: 1150,
    height: 630,
    backgroundColor: 0x222222,
    resolution: window.devicePixelRatio || 1,
  });
  const race = new Race();
  const award = new Award();
  award.visible = false;
  app.stage.addChild(race, award);
  const start = () => {
    award.visible = false;
    race.start();
  };
  const finish = (ranking = []) => {
    race.finish({
      ranking,
      onComplete: () => {
        award.visible = true;
        award.init(ranking, _issueNum);
      },
    });
  };
  const init = ({ issueNum }) => {
    _issueNum = issueNum;
    award.visible = false;
    race.init();
  };
  // award.init([10, 6, 2, 3, 4, 5, 1, 7, 8, 9], '20181203047');
  return {
    view: app.view,
    init,
    start,
    finish,
    initialized: () => race.initialized,
    destroy: () => app.destroy(),
  };
}

export default App;

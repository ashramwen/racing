import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeGameLotteryHistoryFirstData } from '../../../containers/Game/containers/Main/selectors';
import Race from './canvas/App';
import { CountdownContext } from 'containers/Game/';

const START_TIME = 10;
const FINISH_TIME = 40;
let race;

export function RacingComponent({ issueNum, prevIssueNum, prevWinNum }) {
  const { timerCount } = useContext(CountdownContext);
  const pixiRef = React.createRef();

  useEffect(() => {
    if (!race) {
      race = new Race();
      pixiRef.current.appendChild(race.view);
    }

    return () => {
      race.destroy();
      race = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timerCount === START_TIME) {
      // 到第30秒時, call場景初始化
      // (車停在起跑線)
      // ex: canvasAPI.init({ issueNum });
      race.init({ issueNum });
      // console.log('issueNum', issueNum);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerCount]);

  useEffect(() => {
    if (prevWinNum && prevWinNum.trim() && timerCount >= FINISH_TIME) {
      // console.log('change', prevWinNum);
      if (race.initialized()) {
        race.start();
        setTimeout(() => race.finish(prevWinNum.split(',')), 10000);
      }
    }
    // 最後期號有betnumber了, 該車通過終點
    // 起跑，並在10秒後通過終點
    // ex: canvasAPI.start({ prevWinNum: prevHistory.get('winNum) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevWinNum]);

  return <div ref={pixiRef} />;
}

const mapStateToProps = (state) => {
  const historyFirstData = makeGameLotteryHistoryFirstData()(state);
  return {
    issueNum: state.getIn(['gaming', 'issueInfo', 'issueNum']),
    prevIssueNum: historyFirstData ? historyFirstData.get('issueNum') : null,
    prevWinNum: historyFirstData ? historyFirstData.get('winNum') : null,
  };
};

export default connect(mapStateToProps)(RacingComponent);

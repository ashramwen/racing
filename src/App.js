import React, { useState } from 'react';
import Racing from './Racing';
import './App.scss';
import RankingInput from './RankingInput';

function App() {
  const [ranking, setRanking] = useState('');

  return (
    <div className="App">
      <Racing ranking={ranking} />

      <RankingInput setRanking={setRanking} />
    </div>
  );
}

export default App;

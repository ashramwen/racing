import React, { useState } from 'react';

function RankingInputComponent({ setRanking }) {
  const [input, setInput] = useState('1,2,3,4,5,6,7,8,9,10');

  // const genRanking = useCallback(() => Math.floor(Math.random() * 10) + 1, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    setRanking(input);
  };

  return (
    <div className="form">
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={handleClick}>Go!</button>
    </div>
  );
}

export default RankingInputComponent;

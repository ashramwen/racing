import React, { useState } from 'react';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5).join(',');

function RankingInputComponent({ setRanking }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    const ranking = shuffleArray(numbers);
    setInput(ranking);
    setRanking(ranking);
  };

  return (
    <div className="form">
      <input type="text" value={input} onChange={handleChange} readOnly />
      <button onClick={handleClick}>Go!</button>
    </div>
  );
}

export default RankingInputComponent;

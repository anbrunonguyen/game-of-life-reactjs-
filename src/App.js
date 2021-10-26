import './App.css';
import React, { useState, useEffect } from 'react';

const lengthOfTheGame = 10;

const compareArr = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
function App() {
  const arr = new Array(lengthOfTheGame).fill(0);
  const [life, setLife] = useState(new Array(lengthOfTheGame).fill(arr));
  // better practice is
  // const [life, setLife]
  // = useState(new Array(lengthOfTheGame).fill(new Array(lengthOfTheGame).fill(0)))
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (play) {
      onStartGame();
    }
  }, [life, play]);

  const onClickLife = (i, j) => {
    const newLife = [...life];

    // better practice is
    // const newLife = life.map((e) => e.map((el) => el));

    newLife[i] = [...life[i]];
    newLife[i][j] = 1;
    // if you need something to explain, there it is
    // let a = newLife[i];
    // let b = life[i + 1];
    // console.log(a == b);
    setLife([...newLife]);
  };

  const onStartGame = () => {
    console.log('run');
    let stillPlay = false;
    const newLife = life.map((e) => e.map((el) => el));
    for (let x = 0; x < lengthOfTheGame; x++) {
      for (let y = 0; y < lengthOfTheGame; y++) {
        if (areYouStillAlive(x, y)) {
          newLife[x][y] = 1;
          stillPlay = true;
        } else {
          newLife[x][y] = 0;
        }
      }
    }
    if (stillPlay) {
      setTimeout(() => setLife([...newLife]), 500);
    } else {
      console.log('extinct');
      setLife(life);
      setPlay(false);
    }
  };

  const areYouStillAlive = (x, y) => {
    let count = 0;
    compareArr.forEach((coordinates) => {
      if (
        x + coordinates[0] >= 0 &&
        x + coordinates[0] <= lengthOfTheGame - 1 &&
        y + coordinates[1] >= 0 &&
        y + coordinates[1] <= lengthOfTheGame - 1
      ) {
        if (life[x + coordinates[0]][y + coordinates[1]] === 1) {
          count++;
        }
      }
    });
    if (life[x][y] === 1) {
      if (count === 2 || count === 3) {
        return true;
      } else {
        return false;
      }
    } else {
      if (count === 3) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <div className='App'>
      {life.map((e, i) => (
        <div key={Math.random(1000) + '' + Math.random(1000)} className='row'>
          {e.map((c, j) => (
            <div
              key={Math.random(1000) + '' + Math.random(1000)}
              className={c === 1 ? 'alive' : 'dead'}
              onClick={() => {
                onClickLife(i, j);
              }}
            ></div>
          ))}
        </div>
      ))}
      <button onClick={() => setPlay(true)}>Play</button>
      <button onClick={() => setPlay(false)}>Stop</button>
    </div>
  );
}

export default App;

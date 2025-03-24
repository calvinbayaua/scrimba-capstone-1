import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);
  const buttonSection = useRef(null);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    setDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  const diceElements = dice.map((val) => (
    <Die
      key={val.id}
      id={val.id}
      value={val.value}
      isHeld={val.isHeld}
      handleClick={hold}
    />
  ));

  function roll() {
    if (!gameWon) {
      setDice((prev) =>
        prev.map((die) =>
          !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  useEffect(() => {
    if (gameWon) {
      buttonSection.current.focus();
    }
  }, [gameWon]);

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Contratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={roll} ref={buttonSection}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;

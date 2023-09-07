import { useEffect, useState, Fragment } from "react";

import "./App.css";
import { Cell } from "./components/Cell";
import { WinPattern } from "./types";

function App() {
  const initialCells = ["", "", "", "", "", "", "", "", ""];

  const [cells, setCells] = useState(initialCells);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const winPatterns: WinPattern[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (cells: string[]) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return setWinner(cells[a]);
      }
    }

    if (!winner && !cells.includes("")) {
      return setWinner("A Tie!");
    }

    return "";
  };

  const handleCellClick = (id: number) => {
    if (checkWinner(cells) !== "") return;

    const newCells = [...cells];

    if (newCells[id] !== "") return;

    newCells[id] = currentPlayer;
    setCells(newCells);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setCells(initialCells);
    setWinner("");
    setCurrentPlayer("X");
  };

  useEffect(() => {
    checkWinner(cells);
  }, [cells]);

  return (
    <Fragment>
      <div className="actions">
        <span className="go">Current Player: {currentPlayer}</span>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className={`container ${winner ? "game-over" : ""}`}>
        {cells.map((cell, index) => (
          <Cell key={`${cell}-${index}`} id={index} handleCellClick={handleCellClick} cell={cell} />
        ))}
        {winner !== "" && <div className="winner">{winner === "A Tie!" ? winner : `${winner} won!`}</div>}
      </div>
    </Fragment>
  );
}

export default App;

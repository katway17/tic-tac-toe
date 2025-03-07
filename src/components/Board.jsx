import "./board.css";
import Square from "./Square";
import { useState } from "react";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function calculateWinner(squares) {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Returns "X" or "O"
      }
    }
    return null;
  }

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) return; // Ignore clicks if game is over

    const newSquares = [...squares];
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status = winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="board-container">
      <h2 className={`status ${winner ? "winner" : ""}`}>{status}</h2>
      <div className="board">
        {squares.map((square, index) => (
          <Square key={index} value={square} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button className="reset-btn" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default Board;

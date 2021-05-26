//to do: seperate components into seperate files for easier editing and viewing

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import changeStatus from './changeStatus';
import Board from './board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      winner: null, 
      status: 'First Move'
    };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]) {
          //return winning side
          //todo: return an array [winning player, winning spot 1, winning spot 2, winning spot 3]
          return a;
      }
    }
    return null;
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    //this prevents moves being changed,
    //and prevents moves being made after a winner is declared
    const isAlreadyPopulated = !!squares[i];
    if (this.state.winner || isAlreadyPopulated) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  onHistoryButtonClick(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  getDescription(move) {
    if (!move) {
      return 'go to start'
    }
    const turn = move % 2 ? 'X' : 'O';
    const result = `go to move ${move} , ${turn}`;
    return result;
  }



  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];


    const moves = history.map((step, move) => {
      const desc = this.getDescription(move);
      if (this.state.stepNumber === move) {
        return (
          <li key={move}>
            <button onClick={() => this.onHistoryButtonClick(move)} className='move-current'> {desc}</button>
          </li>
        )
      }
      else return (
        <li key={move}>
          <button onClick={() => this.onHistoryButtonClick(move)}>{desc}</button>
        </li>
      )
    });



    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{changeStatus(this.state)}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);





//  Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

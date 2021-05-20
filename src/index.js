import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    //I may need to move the map outside of the return and change it to a nested for loop, 
    //so that I can check for a winner and bold each renderSquare
    return (
      <>
        <div className="board-row">
          {[0, 1, 2].map(index => this.renderSquare(index))}
        </div>
        <div className="board-row">
          {[3, 4, 5].map(index => this.renderSquare(index))}
        </div>
        <div className="board-row">
          {[6, 7, 8].map(index => this.renderSquare(index))}
        </div>
      </>
    )
  }
}

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
      winningLine: null,
      status: 'First Move'
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    //this prevents moves being changed,
    //and prevents moves being made after a winner is declared
    const isAlreadyPopulated = !!squares[i];
    const hasWon = this.calculateWinner(squares);
    if (hasWon || isAlreadyPopulated) {
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

  jumpTo(step) {
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

  calculateWinner(squares) {
    //to do: put status in a seperate method from calculateWinner
    let calculatedStatus;
    //check for winner
    if (this.state.winner) {
      calculatedStatus = 'Winner: ' + this.state.winner
      //else, check that there's more moves left.
    } else if (this.state.stepNumber <= 8) {
      calculatedStatus = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      //else, draw
    } else {
      calculatedStatus = 'The Game has Ended in a Draw';
    }
    this.setState({
      status: calculatedStatus
    })
  
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
        //change state to show winner
        this.setState({
          winningLine: lines[a],
          winner: squares[a]
        })
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];


    const moves = history.map((step, move) => {
      const desc = this.getDescription(move);
      if (this.state.stepNumber === move) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)} className='move-current'> {desc}</button>
          </li>
        )
      }
      else return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
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
          <div>{this.state.status}</div>
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

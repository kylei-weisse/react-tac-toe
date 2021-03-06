import React from 'react';
import Square from './square'

class Board extends React.Component {
    renderSquare(i) {

      let bold=false;
      for (let j = 0; j<=2; j++){
        if (this.props.winnerVal[j]===i){
          bold = true;
        }
      }
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          className={`${bold ? "victory-square" : "square"}`}
        />
      );
    }
  
    render() {
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

  export default Board;
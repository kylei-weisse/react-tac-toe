import React from 'react';
import Square from './square'

class Board extends React.Component {
    renderSquare(i) {
      let winnerVal=null;
      if (this.props.winnerVal){
        //put a loop inside this if statement to make
        //winnerVal truthy, only for the winning statements, which
        //we are getting from index's state.winner, and so 
        //they are in Board as this.props.winnerVal.moves,
        //which is an array. So an example ...Val.moves would be 
        //[0,4,8]
        for(let j=0;j<3;j++){
          
          winnerVal=true;
        }
      }

      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          className={`${winnerVal ? "victory-square" : "square"}`}
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
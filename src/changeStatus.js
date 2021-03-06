//function to display the move/winner status. Note that 
//this is not a React component, but a simple
//JS function.
function changeStatus(state){
    let status;
    if (state.winner) {
      status = 'Winner: ' + state.winner.side;
    } else if (state.stepNumber <= 8) {
      //only show next player if there's still moves left to make
      status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    } else {
      //draw
      status = 'The Game has Ended in a Draw';
    }
    return status;
  }

  export default changeStatus;
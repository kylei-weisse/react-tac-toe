//function to display the move/winner status. Note that 
//this is not a React component, but a simple
//JS function.
function changeStatus(state){
    //to do: link the new showStatus component to the rest of the app
    let status;
    //check for winner
    if (state.winner) {
      status = 'Winner: ' + state.winner;
      console.log(state.winningLine);
      //else, check that there's more moves left.
    } else if (state.stepNumber <= 8) {
      status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
      //else, draw
    } else {
      status = 'The Game has Ended in a Draw';
    }
    return status;
  }

  export default changeStatus;
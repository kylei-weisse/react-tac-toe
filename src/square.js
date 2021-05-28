function Square(props) {
  console.log('Square props.winner: ', props.winner)
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

export default Square;
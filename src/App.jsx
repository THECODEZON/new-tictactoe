
import { useState } from 'react';
import './App.css'





function calculatewinner(squares){
  const winningCombination=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    
    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],

  ];

  for(let i=0;i<winningCombination.length;i++){
    const[a,b,c]=winningCombination[i];

    if(squares[a] && squares[a] ==squares[b] && squares[a] ==squares[c]){
      return squares[a];
    }
  }
  return null;
}



function Square({ value, onSquareClick }) {
  const classes = value === 'X' ? 'square X' : value === 'O' ? 'square O' : 'square';

  return (
    <button className={classes} onClick={onSquareClick}>
      {value}
    </button>
  );
}



function Board({updateWinCounts  }){
  // console.log(`Board rendered` )
   
  const[squares,setSquares]=useState(Array(9).fill(null));
  const[xisNext,setXisNext]=useState(true);
  

  function handleClick(i){
      //  alert(i)
      if(squares[i] || calculatewinner(squares)){
        return;
      }

       const updatedSquare = squares.slice();
       if(xisNext){
       updatedSquare [i]='X';
       setXisNext(false)
       }else{
        updatedSquare[i]='O';
        setXisNext(!xisNext);
       }


       setSquares(updatedSquare);
        const winner = calculatewinner(updatedSquare);
        if (winner) {
          updateWinCounts(winner); // Notify App component of the winner to update win counts
        }

       
  };

  
  const winner = calculatewinner(squares);
  console.log('winner', winner);
  let status;
  if(winner){
    status=`Winner is ${winner} 🥳`
    
  }else{
    status=`Next player is : ${xisNext ? 'X': 'O'}`
  }
  

  return(
   <>
    <div className='status'>{status}</div>
  
    <button className='btn' onClick={() => setSquares(Array(9).fill(null))} style={{
      margin:"10px 0"
    }}>Reset</button>
    <div className="board-row">
    <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
     </div>
    <div className="board-row">
       <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
       <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
       <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
     </div>
    <div className="board-row">
    <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
     </div>
   </>
  )
}


function App() {
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const updateWinCounts = (winner) => {
    if (winner === 'X') {
      setXWins(xWins + 1); // Increment X wins count
    } else if (winner === 'O') {
      setOWins(oWins + 1); // Increment O wins count
    }
  };

  return (

    
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Tic Tac Toe</h1>
      <div>X Wins: {xWins}</div>
      <div>O Wins: {oWins}</div>
      <div class="item-hints">
  <div className="hint" data-position="4">
    <span className="hint-radius"></span>
    <span class="hint-dot">Tip</span>
    <div className="hint-content do--split-children">
      <p>Players take turns marking the spaces with X or O, and the winner is the first player to get three of their marks in a row, either horizontally, vertically, or diagonally.</p>
    </div>
  </div>
</div>
    
      <Board updateWinCounts={updateWinCounts} />
    </div>
  );
}
export default App

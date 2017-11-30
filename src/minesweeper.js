//This is the blank board to accept guesses
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board =[];
  for(let rowIndex = 0;rowIndex < numberOfRows; rowIndex++) {
    const row = [];
    for(let columnIndex=0; columnIndex < numberOfColumns;columnIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}
//This will be hidden and show where the bombs are
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board =[];
  for(let rowIndex = 0;rowIndex < numberOfRows; rowIndex++) {
    const row = [];
    for(let columnIndex=0; columnIndex < numberOfColumns;columnIndex++) {
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
  //Loop is fine with if/else and board array reference to avoid two bombs in one space
  while (numberOfBombsPlaced<numberOfBombs) {
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if(board[randomRowIndex][randomColumnIndex] !== 'B'){
    board [randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  }
  return board;
}

//This piece calculates the number of adjacent bombs - complex
const getNumberOfNeighbourBombs = (bombBoard,rowIndex,columnIndex) => {
  const neighbourOffsets = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs =0;
  neighbourOffsets.forEach(offset => {
    const neighbourRowIndex = rowIndex + offset[0];
    const neighbourColumnIndex = columnIndex + offset[1];
    if(neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows &&
      neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns) {
        if(bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
      return numberOfBombs;
  }
  //Now to add the fliptile option
  const flipTile = (playerBoard,bombBoard,rowIndex,columnIndex) => {
    if(playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped');
      return;
    }

    if(bombBoard[rowIndex][columnIndex] === 'B') {
      playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      playerBoard[rowIndex][columnIndex] =
      getNumberOfNeighbourBombs(bombBoard,rowIndex,columnIndex);
    }
  }

const printBoard = (board) => {
  console.log(board.map(row => row.join('|')).join('\n'));
}

const playerBoard = (generatePlayerBoard(3,3));
const bombBoard = (generateBombBoard(3,3,4));

console.log('Player board:');
printBoard(playerBoard);

console.log('Bomb board:');
printBoard(bombBoard);

flipTile(playerBoard,bombBoard,0,0);
console.log('Updated Player Board:');
printBoard(playerBoard);

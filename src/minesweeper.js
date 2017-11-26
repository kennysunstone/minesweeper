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
  //Loop is fine but can placed 2 bombs in one spcae - fix with control flow
  while (numberOfBombsPlaced<numberOfBombs) {
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board [randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return board;
}
const printBoard =(board) => {
  console.log(board.map(row => row.join('|')).join('\n'));
}

const playerBoard = (generatePlayerBoard(9,9));
const bombBoard = (generateBombBoard(9,9,24));

console.log('Player board:');
printBoard(playerBoard)

console.log('Bomb board:');
printBoard(bombBoard);

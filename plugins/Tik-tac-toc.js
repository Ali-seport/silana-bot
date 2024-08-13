javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let currentPlayer = 'X';

const printBoard = () => {
  console.log('Current Board:');
  console.log(board.map(row => row.join('|')).join('\n'));
  console.log('---------');
};

const checkWinner = () => {
  // Check rows, columns, and diagonals for a winner
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
      return true;
    }
    if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
      return true;
    }
  }
  if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
    return true;
  }
  if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
    return true;
  }
  return false;
};

const isBoardFull = () => {
  return board.every(row => row.every(cell => cell !== ' '));
};

const makeMove = (row, col) => {
  if (board[row][col] === ' ') {
    board[row][col] = currentPlayer;
    if (checkWinner()) {
      printBoard();
      console.log(`Player ${currentPlayer} wins!`);
      rl.close();
    } else if (isBoardFull()) {
      printBoard();
      console.log('It\'s a draw!');
      rl.close();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      printBoard();
      askMove();
    }
  } else {
    console.log('Invalid move! Try again.');
    askMove();
  }
};

const askMove = () => {
  rl.question(`Player ${currentPlayer}, enter your move (row and column): `, (move) => {
    const [row, col] = move.split(' ').map(Number);
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      makeMove(row, col);
    } else {
      console.log('Invalid input! Please enter row and column between 0 and 2.');
      askMove();
    }
  });
};

printBoard();
askMove();
        

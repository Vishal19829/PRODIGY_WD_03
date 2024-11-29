// Variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let round = 1;
let playerXScore = 0;
let playerOScore = 0;

// Winning Combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6] // Diagonal
];

// Start Game
const cells = document.querySelectorAll('.cell');
const roundCounter = document.getElementById('roundCounter');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');
const resetButton = document.getElementById('resetButton');

// Handle Cell Click
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if (gameBoard[index] !== '' || !gameActive) return;
    
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');
    
    checkForWinner();
    togglePlayer();
  });
});

// Check for Winner
function checkForWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '') {
      gameActive = false;
      updateScore();
      return;
    }
  }

  // Check for draw
  if (!gameBoard.includes('')) {
    gameActive = false;
    alert('It\'s a draw!');
  }
}

// Toggle Player
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Update Scores
function updateScore() {
  if (currentPlayer === 'X') {
    playerXScore++;
    playerXScoreDisplay.textContent = playerXScore;
  } else {
    playerOScore++;
    playerOScoreDisplay.textContent = playerOScore;
  }

  round++;
  roundCounter.textContent = `Round: ${round}`;
}

// Reset Game
resetButton.addEventListener('click', resetGame);

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  roundCounter.textContent = `Round: ${round}`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}
 
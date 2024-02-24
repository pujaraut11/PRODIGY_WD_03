let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        document.getElementById('board').children[index].innerText = currentPlayer;
        
        if (checkWinner()) {
            displayMessage(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            displayMessage('It\'s a tie!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            displayMessage(`Current player: ${currentPlayer}`);
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination =>
        combination.every(index => board[index] === currentPlayer)
    );
}

function displayMessage(message) {
    document.getElementById('message').innerText = message;
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.getElementById('message').innerText = '';
    
    const cells = document.getElementById('board').children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
}

// Dynamically create cells on the board
const boardContainer = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => handleCellClick(i));
    boardContainer.appendChild(cell);
}

displayMessage(`Current player: ${currentPlayer}`);

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const timerElement = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let timer;
let timeLeft = 3; // Tempo em segundos para cada jogador

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para iniciar o temporizador
function startTimer() {
    clearInterval(timer); // Limpa qualquer temporizador anterior
    timeLeft = 3;
    timerElement.textContent = `Tempo restante: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Tempo restante: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            switchPlayer();
        }
    }, 1000);
}

// Função para alternar o jogador
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    startTimer();
clearInterval(timer); // Limpa qualquer temporizador anterior
    timeLeft = 3;
    timerElement.textContent = `Tempo restante: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Tempo restante: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            switchPlayer();
        }
    }, 1000);
}

// Função para alternar o jogador
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    startTimer();
    message.textContent = `É a vez do jogador ${currentPlayer}`;
}

// Função para clicar na célula
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}
// Função para verificar o resultado do jogo
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        clearInterval(timer);
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        message.textContent = 'Empate!';
        gameActive = false;
        clearInterval(timer);
        return;
    }

    switchPlayer();
}
// Função para reiniciar o jogo
function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    message.textContent = `É a vez do jogador ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
    startTimer();
}

// Adicionar eventos aos elementos
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Iniciar o jogo
restartGame();

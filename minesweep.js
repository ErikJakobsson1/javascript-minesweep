let board = [];
let rows = 9;
let cols = 9;
let mines = 10;
let gameOver = false;
let flagsPlaced = 0;
let cellsRevealed = 0;

function createBoard(rows, cols, mines) {
    // Skapa tom bräde
    board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = {
                mine: false,
                revealed: false,
                flag: false,
                neighborMines: 0
            };
        }
    }

    // Placera minor slumpmässigt
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        
        if (!board[row][col].mine) {
            board[row][col].mine = true;
            minesPlaced++;
        }
    }

    // Räkna närliggande minor
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!board[i][j].mine) {
                let count = 0;
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        const ni = i + di;
                        const nj = j + dj;
                        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && board[ni][nj].mine) {
                            count++;
                        }
                    }
                }
                board[i][j].neighborMines = count;
            }
        }
    }
}

function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            if (board[i][j].revealed) {
                cell.classList.add('revealed');
                if (board[i][j].mine) {
                    cell.classList.add('mine');
                } else if (board[i][j].neighborMines > 0) {
                    cell.textContent = board[i][j].neighborMines;
                    cell.setAttribute('data-value', board[i][j].neighborMines);
                }
            } else if (board[i][j].flag) {
                cell.classList.add('flag');
            }
            
            cell.addEventListener('click', (e) => handleCellClick(e, i, j));
            cell.addEventListener('contextmenu', (e) => handleRightClick(e, i, j));
            
            gameBoard.appendChild(cell);
        }
    }
    
    document.getElementById('flagCount').textContent = flagsPlaced;
}

function handleCellClick(e, row, col) {
    e.preventDefault();
    if (gameOver) return;
    
    const cell = board[row][col];
    if (cell.revealed || cell.flag) return;
    
    if (cell.mine) {
        // Spelaren förlorade
        gameOver = true;
        revealAllMines();
        alert('Game Over! Du klickade på en mina.');
    } else {
        revealCell(row, col);
        if (checkWin()) {
            gameOver = true;
            alert('Grattis! Du vann!');
        }
    }
    
    renderBoard();
}

function handleRightClick(e, row, col) {
    e.preventDefault();
    if (gameOver) return;
    
    const cell = board[row][col];
    if (cell.revealed) return;
    
    if (!cell.flag) {
        // Placera flagga
        if (flagsPlaced < mines) {
            cell.flag = true;
            flagsPlaced++;
        }
    } else {
        // Ta bort flagga
        cell.flag = false;
        flagsPlaced--;
    }
    
    renderBoard();
}

function revealCell(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    
    const cell = board[row][col];
    if (cell.revealed || cell.flag) return;
    
    cell.revealed = true;
    cellsRevealed++;
    
    if (cell.neighborMines === 0 && !cell.mine) {
        // Rekursivt avslöja närliggande celler
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                revealCell(row + di, col + dj);
            }
        }
    }
}

function revealAllMines() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j].mine) {
                board[i][j].revealed = true;
            }
        }
    }
}

function checkWin() {
    const totalCells = rows * cols;
    return cellsRevealed === totalCells - mines;
}

function startNewGame(newRows, newCols, newMines) {
    rows = newRows;
    cols = newCols;
    mines = newMines;
    gameOver = false;
    flagsPlaced = 0;
    cellsRevealed = 0;
    
    createBoard(rows, cols, mines);
    renderBoard();
}

function resetGame() {
    startNewGame(rows, cols, mines);
}

// Starta spelet med standardinställningar
startNewGame(9, 9, 10);
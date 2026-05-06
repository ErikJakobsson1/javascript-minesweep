let board = [];
let rows = 10;
let cols = 10;
let mineCount = 15;

// Startar spelet
function startNewGame(r, c, mines) {
  rows = r;
  cols = c;
  mineCount = mines;
  setupgame();
}

// startar om
function resetGame() {
  startNewGame(rows, cols, mineCount);
}

function setupgame(){
  let gameElement = document.getElementById("gameBoard");

  gameElement.innerHTML = ""; // Rensa brädet
  gameElement.style.gridTemplateColumns = `repeat(${cols},32px)`;

  board = [];

  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        isMine: false,
        revealed: false,
        flagged: false,
        element: null
      });
    }
    board.push(row);
  }

  // skappar celler ifrån html
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = document.createElement("div");
      cell.classList.add("cell"); // FIX

      // click funktionen 
      cell.dataset.x = x;
      cell.dataset.y = y;

      cell.addEventListener("click", (event) => handleLeftClick(event, y, x));
      cell.addEventListener("contextmenu", (event) => handleRightClick(event, y, x));

      gameElement.appendChild(cell);
      board[y][x].element = cell;
    }
  }

  let placedMines = 0;

  while (placedMines < mineCount) {
    let x = Math.floor(Math.random() * cols);
    let y = Math.floor(Math.random() * rows);

    if (!board[y][x].isMine) {
      board[y][x].isMine = true;
      placedMines++;
    }
  }
}


// vänsterclick fungerar
function handleLeftClick(event, y, x) {

    let cell = board[y][x];

    if (cell.revealed) return;
    if (cell.flagged) return;

    revealCell(x, y);
}


// högerclick fungerar
function handleRightClick(event, y, x) {

    event.preventDefault();

    let cell = board[y][x];

    if (cell.revealed) return;

    if (cell.flagged) {
        cell.flagged = false;
        cell.element.classList.remove("flag");
    } else {
        cell.flagged = true;
        cell.element.classList.add("flag");
    }
}


// öppnar rutan när du clickar
function revealCell(x, y) {

    let cell = board[y][x];

    if (cell.revealed) return;

    cell.revealed = true;
    cell.element.classList.add("revealed");

    if (cell.isMine) {
        cell.element.classList.add("mine");
        return;
    }

    let count = countMines(x, y);

    if (count > 0) {
        cell.element.textContent = count;
        cell.element.dataset.value = count; // färg m.m.
    }
    else {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {

                let nx = x + dx;
                let ny = y + dy;

                if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                    revealCell(nx, ny);
                }
            }
        }
    }
}


// räknar minor
function countMines(x, y){
  let numberofmines = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {

        let nx = x + dx;
        let ny = y + dy;

        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
          if (board[ny][nx].isMine) {
            numberofmines++;
          }
        }
    }
  }

  return numberofmines;
}
function setupgame(){

}

<<<<<<< HEAD
//person 1 (carl)
  const width = 10;
const height = 10;
=======
  
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push({
        isMine: false,
        revealed: false,
        flagged: false,
        element: null
      });
>>>>>>> c396550fa2cc3b02b7e9776751639301abf3c6dc

let board = [];

for (let y = 0; y < height; y++) {
  let row = [];
  for (let x = 0; x < width; x++) {
    row.push({
      isMine: false,
    });
  }
  board.push(row);
}

const mineCount = 15;
let placedMines = 0;

while (placedMines < mineCount) {
  let x = Math.floor(Math.random() * width);
  let y = Math.floor(Math.random() * height);

  if (!board[y][x].isMine) {
    board[y][x].isMine = true;
    placedMines++;
  }
}









////Nisse:
// När man vänsterklickar → kör funktionen handleLeftClick
cell.addEventListener("click", handleLeftClick);

// När man högerklickar → kör funktionen handleRightClick
cell.addEventListener("contextmenu", handleRightClick);

// Spara position i HTML så vi vet vilken ruta som klickas
cell.dataset.x = x;
cell.dataset.y = y;


// Funktion som körs när man vänsterklickar
function handleLeftClick(event) {

    // Hämta rutan som klickades
    let clickedCell = event.target;

    // Hämta position (x och y)
    let x = Number(clickedCell.dataset.x);
    let y = Number(clickedCell.dataset.y);

    // Hämta motsvarande ruta i arrayen
    let cell = board[y][x];

    // Om redan öppnad → gör inget
    if (cell.revealed === true) return;

    // Om den har flagga → gör inget
    if (cell.flagged === true) return;

    // Öppna rutan
    revealCell(x, y);
}

// Funktion som körs vid högerklick
function handleRightClick(event) {

    // Stoppar webbläsarens meny
    event.preventDefault();

    let clickedCell = event.target;

    let x = Number(clickedCell.dataset.x);
    let y = Number(clickedCell.dataset.y);

    let cell = board[y][x];

    // Om rutan redan är öppnad → gör inget
    if (cell.revealed === true) return;

    // Om flagga finns → ta bort
    if (cell.flagged === true) {
        cell.flagged = false;
        clickedCell.classList.remove("flag");
    } 
    // Annars → sätt flagga
    else {
        cell.flagged = true;
        clickedCell.classList.add("flag");
    }
}

// Funktion som öppnar en ruta
function revealCell(x, y) {

    let cell = board[y][x];

    // Om redan öppnad → gör inget
    if (cell.revealed === true) return;

    // Markera som öppnad
    cell.revealed = true;
    cell.element.classList.add("revealed");

    // Om det är en mina → stoppa
    if (cell.mine === true) {
        cell.element.classList.add("mine");
        return;
    }

    // Räkna minor runt (du måste ha denna funktion)
    let count = countMines(x, y);

    // Om det finns minor → visa nummer
    if (count > 0) {
        cell.element.textContent = count;
    } 
    
    // Om inga minor → öppna alla grannar (FLOOD FILL)
    else {

        // Loopar igenom alla rutor runt
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {

                let nx = x + dx;
                let ny = y + dy;

                // Kolla så vi inte går utanför
                if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {

                    // Öppna nästa ruta (rekursion)
                    revealCell(nx, ny);
                }
            }
        }
    }
}


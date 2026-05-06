function setupgame(){
  gameElement = document.getElementById("gameBoard")
  gameElement.style.gridTemplateColumns = `repeat(${9},32px)`;
    //person 1 (carl)
    const width = 10;
  const height = 10;
 
  let board = [];
 let rows = 10;
let cols = 10;
 
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push({
        isMine: false,
        revealed: false,
        flagged: false,
        element: null
      });
 
    }
    board.push(row);
  }
  // create HTML cells
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let cell = document.createElement("div");
      cell.classList.add("container");


  // Göra så spelet fungerar

        ////Nisse:
      // När man vänsterklickar kör funktionen handleLeftClick
      cell.addEventListener("click", (event) => handleLeftClick(event, y, x));
      // När man högerklickar kör funktionen handleRightClick
     cell.addEventListener("contextmenu", (event) => handleRightClick(event, y, x));
      gameElement.appendChild(cell);
      board[y][x].element = cell;
    }
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
 
 
 
 
 
}
 
 
 
// Funktion som körs när man vänsterklickar
function handleLeftClick(y, x) {
 
    // Hämta rutan som klickades
    let clickedCell = event.target;
 
    // Hämta position (x och y)
    let x = Number(clickedCell.dataset.x);
    let y = Number(clickedCell.dataset.y);
   cell.classList.add("cell");
    // Hämta motsvarande ruta i arrayen
    let cell = board[y][x];
 
    // Om redan öppnad gör inget
    if (cell.revealed === true) return;
 
    // Om den har flagga gör inget
    if (cell.flagged === true) return;
 
    // Öppna rutan
    revealCell(x, y);
}
 
// Funktion som körs vid högerklick
function handleRightClick(y, x) {
 
    // Stoppar webbläsarens meny
    event.preventDefault();
 
    let clickedCell = event.target;
 
    let x = Number(clickedCell.dataset.x);
    let y = Number(clickedCell.dataset.y);
 
    let cell = board[y][x];
 
    // Om rutan redan är öppnad  gör inget
    if (cell.revealed === true) return;
 
    // Om flagga finns ta bort
    if (cell.flagged === true) {
        cell.flagged = false;
        clickedCell.classList.remove("flag");
    }
    // Annars sätt flagga
    else {
        cell.flagged = true;
        clickedCell.classList.add("flag");
    }
}
 
// Funktion som öppnar en ruta
function revealCell(x, y) {
 
    let cell = board[y][x];
 
    // Om redan öppnad gör inget
    if (cell.revealed === true) return;
 
    // Markera som öppnad
    cell.revealed = true;
    cell.element.classList.add("revealed");
 
    // Om det är en mina → stoppa
    if (cell.isMine === true) {
        cell.element.classList.add("mine");
        return;
    }
 
    // Räkna minor runt (du måste ha denna funktion)
    let count = countMines(x, y);
 
    // Om det finns minor → visa nummer
    if (count > 0) {
        cell.element.textContent = count;
    }
   
    // Om inga minor öppna alla grannar (FLOOD FILL)
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
 
 
 
function countMines(x, y){
  let numberofmines = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
 
        let nx = x + dx;
        let ny = y + dy;
 
        // Kolla så vi inte går utanför
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
          if (board[ny][nx].isMine) {
            numberofmines ++
          }
           
        }
    }
  }
  return numberofmines;
}


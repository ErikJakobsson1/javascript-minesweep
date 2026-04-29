function setupgame(){

}

console.log("carl");

for (let i = 0; i < 100; i++) {
    console.log("Carl Åhs, Hovlandaexpress@gmail.com");
  }
//person 1 (carl)
  const width = 10;
const height = 10;

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


function handleLeftClick(event) {

    // den rutan du clickade på gashpa
    let clickedCell = event.target;

    // Hämtar x och y från HTML
    let x = Number(clickedCell.dataset.x);
    let y = Number(clickedCell.dataset.y);

    // Hämta motsvarande ruta i vår spel-array
    let cell = board[y][x];

    // när rutan redan clickats öppen låt den vara öpen
    if (cell.revealed === true) {
        return;
    }

    // öppnar den klickade rutnan utan redan öppen
    revealCell(x, y);
}
function revealCell(x, y) {
    const cell = board[y][x];

    if (cell.revealed) return;

    cell.revealed = true;
    cell.element.classList.add("revealed");

    // 💣 om man clickar på minan så slutar spelet och man får börja om
    if (cell.mine) {
        cell.element.classList.add("mine");
        alert("Game Over!");
        revealAllMines();
        return;
    }

    // 🔢 räknar ut minor runt
    let count = countMines(x, y);

    if (count > 0) {
        cell.element.textContent = count;
        cell.element.dataset.value = count;
    } else {
        // 🔄 Flood fill rutor runt utan bomb närlliggande öppnas automatiskt
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                let nx = x + dx;
                let ny = y + dy;

                if (
                    nx >= 0 && nx < cols &&
                    ny >= 0 && ny < rows
                ) {
                    revealCell(nx, ny);
                }
            }
        }
    }
}
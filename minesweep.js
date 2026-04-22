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

  // kolla så det inte redan är en mina där
  if (!board[y][x].isMine) {
    board[y][x].isMine = true;
    placedMines++;
  }
}







//Nisse:


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
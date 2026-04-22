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
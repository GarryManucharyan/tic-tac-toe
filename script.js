//#region variables

let area = document.getElementById("area");
let winnerName = document.getElementById("winnerName");
let winnerDeclareBlock = document.getElementById("winner");
let clicks = 1;
let cellsCount = 9;
let matrixModel = [];
let id = 0;
let tryAgainBtn = document.getElementById("tryAgain");
let retryBtn = document.getElementById("retry");

//#endregion

//#region functional

for (let i = 0; i < cellsCount; i++) {
  createCell();
}
for (let i = 0; i < cellsCount ** (1 / 2); i++) {
  matrixModel.push([]);
}

let cells = area.children;

function mainStart() {
  for (let cell of cells) {
    cell.addEventListener("click", handlePushSymbol);
    cell.id = id;
    id++;
  }
}

tryAgainBtn.addEventListener("click", handleTryAgain);
retryBtn.addEventListener("click", handleRetry);

//#endregion

//#region eventlisteners

function handlePushSymbol(e) {
  if (!e.target.innerText) {
    if (clicks % 2) {
      e.target.innerText = "✘";
    } else e.target.innerText = "⭕";
    clicks++;
  }
  matrixModel[cellRowIndex(e.target.id)][cellColIndex(e.target.id)] =
    e.target.innerText;
  if (clicks >= cellsCount ** (1 / 2) * 2 - 1) {
    if (checkWinner(matrixModel)) {
      winnerName.innerText = checkWinner(matrixModel);
      winnerDeclareBlock.style.display = "block";
    }
  }
    console.log(matrixModel);
}

function handleTryAgain() {
  clearArea(cells);
  clicks = 1;
  winnerDeclareBlock.style.display = "none";
  matrixModel = [];
  for (let i = 0; i < cellsCount ** (1 / 2); i++) {
    matrixModel.push([]);
  }
}

function handleRetry() {
  clearArea(cells);
  clicks = 1;
  matrixModel = [];
  for (let i = 0; i < cellsCount ** (1 / 2); i++) {
    matrixModel.push([]);
  }
}

//#endregion

//#region helpers

function clearArea(area) {
  for (let cell of area) {
    cell.innerText = "";
  }
}

function createCell() {
  let cell = document.createElement("div");
  cell.className = "cell";
  area.append(cell);
}

function cellRowIndex(id) {
  let result = 0;
  for (let i = 1; i <= id; i++) {
    if (!(i % cellsCount ** (1 / 2))) result++;
  }
  return result;
}

function cellColIndex(id) {
  let result = 0;
  for (let i = 1; i <= id; i++) {
    if (!(i % cellsCount ** (1 / 2))) result = 0;
    else result++;
  }
  return result;
}

function checkWinner(matrix) {
  if (checkRows(matrix)) return checkRows(matrix);
  else if (checkCols(matrix)) return checkCols(matrix);
  else if (checkDiagonalDown(matrix)) return checkDiagonalDown(matrix);
  else if (checkDiagonalUp(matrix)) return checkDiagonalUp(matrix);
  else if (clicks - 1 == cellsCount) return "Draw!!!";
}

function checkRows(matrix) {
  let temp = true;
  for (let row = 0; row < matrix.length && temp; row++) {
    for (let col = 1; col < matrix.length; col++) {
      if (matrix[row][col] != matrix[row][col - 1]) temp = false;
    }
    if (temp && matrix[row][0]) {
      return `${matrix[row][0]} wins`;
    }
    temp = true;
  }
  return false;
}

function checkCols(matrix) {
  let temp = true;
  for (let col = 0; col < matrix.length && temp; col++) {
    for (let row = 1; row < matrix.length; row++) {
      if (matrix[row][col] != matrix[row - 1][col]) temp = false;
    }
    if (temp && matrix[0][col]) {
      return `${matrix[0][col]} wins`;
    }
    temp = true;
  }
  return false;
}

function checkDiagonalDown(matrix) {
  let temp = true;
  for (let i = 1; i < matrix.length && temp; i++) {
    if (matrix[i][i] != matrix[i - 1][i - 1]) temp = false;
  }
  if (temp && matrix[0][0]) {
    return `${matrix[0][0]} wins`;
  }
  return false;
}

function checkDiagonalUp(matrix) {
  let temp = true;
  for (let row = 1, col = 1; col < matrixModel.length; col++, row--) {
    if (matrix[row][col] != matrix[row + 1][col - 1]) temp = false;
  }
  if (temp && matrix[matrix.length - 1][0]) {
    return `${matrix[matrix.length - 1][0]} wins`;
  }
  return false;
}

// console.log(cellRowIndex(10));
// console.log(cellColIndex(6));

//#endregion

mainStart();

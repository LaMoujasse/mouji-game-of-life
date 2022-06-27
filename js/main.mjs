const displayParamsDiv = document.getElementById('gameParams')
const gridHeight = 500;
const gridWidth = 500;
const cellHeight = 20;
const cellWidth = 20;
const maxCellsWidth = gridWidth / cellWidth;
const maxCellsHeight = gridHeight / cellHeight;


const aliveCellDisplay = {
  fillStyle: "green"
}
const maxCells = (gridHeight * gridWidth) / (cellHeight * cellWidth)
const stringParams = `Mouji's game of life will start in a grid of shape : ${gridWidth} * ${gridHeight} pixels, a cell is : ${cellWidth} * ${cellHeight} pixels. It will spawn ${maxCells} cells. There will be ${maxCellsWidth} cells in a single line, ${maxCellsHeight} cells in a single column`
console.log(stringParams)
displayParamsDiv.innerText = stringParams
const canvas = document.getElementById('mouj');
const ctx = canvas.getContext('2d');
const template = [
  {isAlive: 1, x: 14, y: 14},
  {isAlive: 1, x: 15, y: 14},
  {isAlive: 1, x: 15, y: 13},
  {isAlive: 1, x: 16, y: 14}
]
let grid = initGame()

console.log('init done : start interval')
let gen = 1
setInterval(() => {
  grid = nextGen(grid, ctx)
  console.log(`ended generation ${gen}`)
  gen++
}, 100)


function drawCell(cell, x, y, ctx) {
  ctx.fillStyle = cell.isAlive ? "green" : "black"
  ctx.fillRect(x, y, 20, 20);
}

function initGame(baseTemplate = []) {
  const grid = []
  for (let i = 0; i < maxCellsWidth; i++) {
    for (let j = 0; j < maxCellsHeight; j++) {
      const mandatoryCell = baseTemplate.find(cell => cell.x === i && cell.y === j)
      let cell = {
        isAlive: baseTemplate.length > 0 ? 0 : Math.round(Math.random()),
        x: i,
        y: j,
      }
      cell = mandatoryCell ? mandatoryCell : cell
      grid.push(cell)
      drawCell(cell, i * 20, j * 20, ctx)
    }
  }
  return grid
}


function nextGen(grid, ctx) {
  let newGrid = []
  for (const cell of grid) {
    let updated = updateCell(cell)
    newGrid.push(updated)
    drawCell(updated, updated.x * 20, updated.y * 20, ctx)
  }
  return newGrid
}

function getNeighbours(cell) {
  const neighbourCoordinates = {
    left: {
      x: cell.x - 1 < 0 ? maxCellsWidth - 1 : cell.x - 1,
      y: cell.y
    },
    right: {
      x: cell.x + 1 >= maxCellsWidth ? 0 : cell.x + 1,
      y: cell.y
    },
    topLeft: {
      x: cell.x - 1 < 0 ? maxCellsWidth - 1 : cell.x - 1,
      y: cell.y - 1 < 0 ? maxCellsHeight - 1 : cell.y - 1
    },
    topRight: {
      x: cell.x + 1 >= maxCellsWidth ? 0 : cell.x + 1,
      y: cell.y - 1 < 0 ? maxCellsHeight - 1 : cell.y - 1
    },
    top: {
      x: cell.x,
      y: cell.y - 1 < 0 ? maxCellsHeight - 1 : cell.y - 1
    },
    bot: {
      x: cell.x,
      y: cell.y + 1 >= maxCellsHeight ? 0 : cell.y + 1
    },
    botLeft: {
      x: cell.x - 1 < 0 ? maxCellsWidth - 1 : cell.x - 1,
      y: cell.y + 1 >= maxCellsHeight ? 0 : cell.y + 1
    },
    botRight: {
      x: cell.x + 1 >= maxCellsWidth ? 0 : cell.x + 1,
      y: cell.y + 1 >= maxCellsHeight ? 0 : cell.y + 1
    },
  }
  return {
    top: grid.find(cell => cell.x === neighbourCoordinates.top.x && cell.y === neighbourCoordinates.top.y),
    topLeft: grid.find(cell => cell.x === neighbourCoordinates.topLeft.x && cell.y === neighbourCoordinates.topLeft.y),
    topRight: grid.find(cell => cell.x === neighbourCoordinates.topRight.x && cell.y === neighbourCoordinates.topRight.y),
    left: grid.find(cell => cell.x === neighbourCoordinates.left.x && cell.y === neighbourCoordinates.left.y),
    right: grid.find(cell => cell.x === neighbourCoordinates.right.x && cell.y === neighbourCoordinates.right.y),
    bot: grid.find(cell => cell.x === neighbourCoordinates.bot.x && cell.y === neighbourCoordinates.bot.y),
    botLeft: grid.find(cell => cell.x === neighbourCoordinates.botLeft.x && cell.y === neighbourCoordinates.botLeft.y),
    botRight: grid.find(cell => cell.x === neighbourCoordinates.botRight.x && cell.y === neighbourCoordinates.botRight.y),
  }
}

function updateCell(cell) {
  // check
  const {
    top,
    topLeft,
    topRight,
    left,
    right,
    bot,
    botLeft,
    botRight,
  } = getNeighbours(cell)
  const aliveNeiCount = top.isAlive + topLeft.isAlive + topRight.isAlive + left.isAlive + right.isAlive + bot.isAlive + botLeft.isAlive + botRight.isAlive
  let newCell = {...cell}
  if (cell.isAlive) {
    // check has 3 neighbour to do nothing otherwise die
    if (aliveNeiCount < 2 || aliveNeiCount > 3) {
      newCell.isAlive = 0
    }
  } else {
    // check has 3 neighbour to live otherwise do nothing
    if (aliveNeiCount === 3) {
      newCell.isAlive = 1
    }
  }
  return newCell

}

//
// ctx.fillStyle = 'green';
// ctx.fillRect(700, 700, 20, 20);

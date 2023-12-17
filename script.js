let defaultColor = '#333333';
let eraseColor = '#EDEDED';

let paintingMode;
let colorPicker = document.getElementById('colorPicker');

function addClickListener(id, handler) {
  document.getElementById(id).addEventListener('click', handler);
}

function setPaintingMode(modeFunction) {
  paintingMode = modeFunction;
}

function getDefaultColor() {
  return colorPicker.value;
}

function getEraseColor() {
  return eraseColor;
}

function rainbowMode() {
  return getRandomColor();
}

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

function createGrid(rows, columns) {
  let container = document.getElementById('gridContainer');
  container.innerHTML = '';

  let cellSize = `${100 / columns}%`;

  for (let i = 0; i < rows * columns; i++) {
    let cell = document.createElement('div');

    cell.classList.add('grid-cell');
    cell.style.width = cellSize;
    container.appendChild(cell);
  }

  container.addEventListener('mousedown', startPainting);
  container.addEventListener('mousemove', paintGrid);
  container.addEventListener('mouseup', stopPainting);
}

function updateGridSize(value, size) {
  let valueOutput = document.getElementById(value);
  let gridSize = document.getElementById(size);

  valueOutput.innerHTML = `${gridSize.value} x ${gridSize.value}`;

  createGrid(gridSize.value, gridSize.value);
}

let lastPaintedCell;

function paintGrid(e) {
  if (!isPainting) return;

  let chosenColor;
  let currentCell = e.target;

  if (currentCell !== lastPaintedCell) {
    if (paintingMode === rainbowMode) {
      chosenColor = getRandomColor();
    } else {
      chosenColor = paintingMode();
    }

    currentCell.style.backgroundColor = chosenColor;

    lastPaintedCell = currentCell;
  }
}

let isPainting = false;

function startPainting(e) {
  isPainting = true;
  paintGrid(e);
}

function stopPainting() {
  isPainting = false;
}

function updateDate() {
  let date = new Date();
  let year = date.getFullYear();
  let footerP = document.getElementById('updateYear');
  footerP.innerHTML = `Copyright &copy ${year} Douglas Fantin`;
}

window.addEventListener('load', () => {
  updateDate();
  createGrid(8, 8);

  let value = 'sizeValue';
  let size = 'sizeSlider';

  setPaintingMode(getDefaultColor);

  addClickListener('default', () => setPaintingMode(getDefaultColor));
  addClickListener('random', () => setPaintingMode(rainbowMode));
  addClickListener('erase', () => setPaintingMode(getEraseColor));
  addClickListener('clear', () => {
    let gridSize = document.getElementById('sizeSlider');
    createGrid(gridSize.value, gridSize.value);
  });

  document.getElementById(size).addEventListener('input', (event) => {
    updateGridSize(value, size);
  });
});
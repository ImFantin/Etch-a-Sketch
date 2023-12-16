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
}

function updateGridSize(value, size) {
  let valueOutput = document.getElementById(value);
  let gridSize = document.getElementById(size);

  valueOutput.innerHTML = `${gridSize.value} x ${gridSize.value}`;

  createGrid(gridSize.value, gridSize.value);
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

  document.getElementById(size).addEventListener('input', (event) => {
    updateGridSize(value, size);
  });
});
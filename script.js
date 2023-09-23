let date = new Date();
let year = date.getFullYear();
let footerP = document.getElementById('updateYear');
updateYear.innerHTML = `Copyright &copy ${year} Douglas Fantin`;

let container = document.getElementById('gridContainer');

function clear() {
  container.innerHTML = '';
}

function createGrid(rows, columns) {
  clear();
  
  let cellSize = `${100 / columns}%`;
  
  for (let i = 0; i < rows * columns; i++) {
    let cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.style.width = cellSize;
    container.appendChild(cell);
  }
}

window.addEventListener('load', () => {
  createGrid(16, 16);
});

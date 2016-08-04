var board = document.getElementById('board');

var grid = [[], [], [], [], [], [] ,[], [], []];


for(var i = 0; i < 9; i++){ // inserting row
  var row = document.createElement('div');
  row.className = "row";
  board.appendChild(row);
  for(var j = 0; j < 9; j++){ //inserting elements in each row
    var tile = document.createElement('input');
    tile.className = "tile";
    tile.maxLength = 1;
    tile.dataset.coord = [i, j];
    row.appendChild(tile);
    tile.addEventListener('click', function click(e){
      e.currentTarget.value = "";
    });
    grid[i][j] = tile;
  }
}






//adding solve and reset buttons
var solve = document.getElementById('solve');

solve.addEventListener('click', function solvePuzzle(e){
  var sGrid = grid.map(function(row){ // used ir
    return row.map(function(el){
      var value = parseInt(el.value);
      return value ? value : 0;
    });
  });

  if(!solver(sGrid)){
    return;
  }
  sGrid.forEach(function(row, i){
    row.forEach(function(el, j){
      grid[i][j].value = el;
    });
  });
});


var reset = document.getElementById('reset');

reset.addEventListener('click', function resetPuzzle(){
  grid.forEach(function(row, i){
    row.forEach(function(el, j){
      el.value = "";
    });
  });
});

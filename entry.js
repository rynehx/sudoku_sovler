var board = document.getElementById('board');

var grid = [[], [], [], [], [], [] ,[], [], []];


for(var i = 0; i < 9; i++){
  var row = document.createElement('div');
  row.className = "row";
  board.appendChild(row);
  for(var j = 0; j < 9; j++){
    var tile = document.createElement('input');
    tile.className = "tile";
    tile.maxLength = 1;
    tile.dataset.coord = [i, j];
    row.appendChild(tile);
    tile.onChange = change;
    grid[i][j] = tile;
  }
}

function change(){

}


var solve = document.getElementById('solve');
solve.addEventListener('click', solvePuzzle);

var reset = document.getElementById('reset');
reset.addEventListener('click', resetPuzzle);

function resetPuzzle(){
  grid.forEach(function(row, i){
    row.forEach(function(el, j){
      el.value = "";
    });
  });
}


function solvePuzzle(e){
  var sGrid = grid.map(function(row){ // used ir
    return row.map(function(el){
      var value = parseInt(el.value);

      return value ? value : 0;
    });
  });


  if(!solver(sGrid)){
    console.log('bad input');
    return;
  }


  sGrid.forEach(function(row, i){
    row.forEach(function(el, j){
      grid[i][j].value = el;
    });
  });
}

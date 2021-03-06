// var testGrid = [
// [5, 3, 0, 0, 7, 0, 0, 0, 0],
// [6, 0, 0, 1, 9, 5, 0, 0, 0],
// [0, 9, 8, 0, 0, 0, 0, 6, 0],
// [8, 0, 0, 0, 6, 0, 0, 0, 3],
// [4, 0, 0, 8, 0, 3, 0, 0, 1],
// [7, 0, 0, 0, 2, 0, 0, 0, 6],
// [0, 6, 0, 0, 0, 0, 2, 8, 0],
// [0, 0, 0, 4, 1, 9, 0, 0, 5],
// [0, 0, 0, 0, 8, 0, 0, 7, 9]
// ];

var testGrid = [
[5, 3, 0, 0, 7, 0, 0, 0, 0],
[6, 0, 0, 1, 9, 5, 0, 0, 0],
[0, 9, 8, 0, 0, 0, 0, 6, 0],
[8, 0, 0, 0, 6, 0, 0, 0, 3],
[4, 0, 0, 8, 0, 3, 0, 0, 1],
[7, 0, 0, 0, 2, 0, 0, 0, 6],
[0, 6, 0, 0, 0, 0, 2, 8, 0],
[0, 0, 0, 4, 1, 9, 0, 0, 5],
[0, 0, 0, 0, 8, 0, 0, 7, 9]
];


var solver = function(grid){

  var seen = []; // create arrays to keep track of elements that are inputted or empty
  var unseen = [];

  if(!validCheck(grid)){ //checks if the initial input has any duplicate violations
    alert("invalid input");
    return;
  }

  grid.forEach(function(row, i){ //put all none default tiles into the unseen array
    row.forEach(function(el, j){
      if(el === 0){
        unseen.push({
          pos:[i, j],
          try: 0
        });
      }
    });
  });

  while(unseen.length > 0){//a loop to keep trying and back tracking while there are empty tiles

    var current = unseen.shift(); // taking a empty tile from the unseen array

    if(current.try < 9){ // keep trying and until we succeed or reach 9

      current.try++;
      if(checkPlace(current.try, current.pos, grid)){

        grid[current.pos[0]][current.pos[1]] = current.try; // if valid we input
        seen.push(current);
      }else{

        unseen.unshift(current); // if invalid to put it into the unseen and increment next try
      }
    }else{ //if we try all 1-9 we can to backtrack to the previous tile and retry a new valid value.

      current.try = 0;
      grid[current.pos[0]][current.pos[1]] = 0;
      unseen.unshift(current);

      var prev = seen.pop();

      if(prev){ //if the seen is empty it denotes that the algorithm cannot find a solution
        unseen.unshift(prev);
      }else{
        alert("unsolvable puzzle"); // if we back track all the way to the beginning then we have a unsolvable puzzle
        return false;
      }
    }
  }

  grid.forEach(function(row){ //prints grid
    console.log(row);
  });

  return grid;
};



var validCheck = function(grid){
  var seen = [];

  grid.forEach(function(row, i){
    row.forEach(function(el, j){
      if(el > 0){
        seen.push({
          pos:[i, j],
          try: el
        });
      }
    });
  });


  var check = true;
  seen.forEach(function(el){
    if(checkRow(el.try, el.pos[0], grid) > 1 ||
       checkCol(el.try, el.pos[1], grid) > 1 ||
       checkBox(el.try, el.pos[0], el.pos[1], grid) > 1 ){
         check = false;
    }

  });

  return check;
};

var checkPlace = function(input, pos, grid){
  if(!checkRow(input, pos[0], grid) &&
     !checkCol(input, pos[1], grid) &&
     !checkBox(input, pos[0], pos[1], grid)){

       return true;

  }
  return false;
};

var checkRow = function(input ,row, grid){
  var res = 0;
  grid[row].forEach(function(el){

    if(el === input){
      res++;
    }

  });

  return res;
};

var checkCol = function(input, col, grid){
  var res = 0;
  for(var i = 0; i < 9; i++){
    if(grid[i][col] === input)
      res++;
  }
  return res;
};


var checkBox = function(input, row, col, grid){
  var x = Math.floor(row/3)*3;
  var y = Math.floor(col/3)*3;
  var res = 0;

  for(var i = x; i < x + 3; i++){
    for(var j = y; j < y + 3; j++){

        if(grid[i][j] === input)
        res++;
    }
  }
  return res;
};

// solver(testGrid);

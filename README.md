#Sudoku Solver

This is a simple app used to find a solution to an user inputted sudoku puzzle.

##algorithm

The algorithm first check if the initial board has any duplicate violations. If the board is absent with violations then the empty tiles are put into an array (`unseen`).

The algorithm takes one empty tile from the `unseen` at a time and tries to iterate through 1-9 and check if each is a valid input onto the board and the tile is put onto the `seen` array. If such tile is valid then it is placed, else the tile is put back into the unseen and the next iteration with increment the tile. If the tile tried 1-9 then it is invalid to advance there the it is put back into the `unseen` and the previous tile is now tried. If the algorithm goes back to the beginning then the board is unsolvable because all previous tries are all invalid.

```javascript
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

```

##check for input
The sections below detail the code to check if a entry is valid based on previous entries on the board. The general check for valid row/column/sub-box placement.

```javascript
var checkPlace = function(input, pos, grid){ // checks if row, column and sub box are valid
  if(!checkRow(input, pos[0], grid) &&
     !checkCol(input, pos[1], grid) &&
     !checkBox(input, pos[0], pos[1], grid)){

       return true;

  }
  return false;
};
```

###row

the code below checks if the input is valid by checking if there is a duplicate value in the row.

```javascript
var checkRow = function(input ,row, grid){
  var res = 0;
  grid[row].forEach(function(el){

    if(el === input){
      res++;
    }

  });

  return res;
};
```


###column

the code below checks if the input is valid by checking if there is a duplicate value in the column.

```javascript
var checkCol = function(input, col, grid){
  var res = 0;
  for(var i = 0; i < 9; i++){
    if(grid[i][col] === input)
      res++;
  }
  return res;
};
```

###sub-box
the code below checks if the input is valid by checking if there is a duplicate value in the sub-box.

```javascript
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
```

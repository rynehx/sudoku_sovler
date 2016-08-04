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

  var seen = [];
  var unseen = [];

  if(!validCheck(grid)){
    alert("invalid input");
    return;
  }

  grid.forEach(function(row, i){
    row.forEach(function(el, j){
      if(el === 0){
        unseen.push({
          pos:[i, j],
          try: 0
        });
      }
    });
  });

  while(unseen.length > 0){

    var current = unseen.shift();

    if(current.try < 9){

      current.try++;
      if(checkPlace(current.try, current.pos, grid)){

        grid[current.pos[0]][current.pos[1]] = current.try;
        seen.push(current);
      }else{
        //grid[current.pos[0]][current.pos[1]] = 0;
        unseen.unshift(current);
      }
    }else{

      current.try = 0;
      grid[current.pos[0]][current.pos[1]] = 0;
      unseen.unshift(current);

      var prev = seen.pop();

      if(prev){ //if the seen is empty it denotes that the algorithm cannot find a solution
        unseen.unshift(prev);
      }else{
        alert("unsolvable puzzle");
        return false;
      }
    }
  }

  // grid.forEach(function(row){
  //   console.log(row);
  // });

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

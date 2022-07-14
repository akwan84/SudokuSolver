var count = 0;
var selectedRow = -1;
var selectedCol = -1;
var counter = 0;

function clearBoard(){
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      document.getElementById(i + "" + j).innerHTML = " ";
    }
  }
  if(selectedRow != -1 && selectedCol != -1){
    document.getElementById(selectedRow + "" + selectedCol).style.backgroundColor = "";
    selectedRow = -1;
    selectedCol = -1;
  }
}

function selectCell(row, col){
  if(selectedRow != -1 && selectedCol != -1){
   document.getElementById(selectedRow + "" + selectedCol).style.backgroundColor = "";
  }
  selectedRow = row;
  selectedCol = col;
  document.getElementById(row + "" + col).style.backgroundColor = "#accbfa";
  console.log(row + " " + col);
}

function fillCell(val){
  if(selectedRow != -1 && selectedCol != -1){
    var id = "" + selectedRow + "" + selectedCol;
    document.getElementById(id).innerHTML = val + "";
  }
}

function solve(){
  var board = [['.','.','.','.','.','.','.','.','.',],['.','.','.','.','.','.','.','.','.',],['.','.','.','.','.','.','.','.','.',],['.','.','.','.','.','.','.','.','.',],['.','.','.','.','.','.','.','.','.',],['.','.','.','.','.','.','.','.','.',],['.','.','.','.','.','.','.','.','.',],['.','.','.','.','.','.','.','.','.',],['.','.','.','.','.','.','.','.','.',]];
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      var cur = document.getElementById(i + "" + j).innerHTML;
      if(cur == " "){
        board[i][j] = '.';
      }else{
        board[i][j] = cur;
      }
    }
  }
  
  counter = 0;
  findSolution(0, 0, board);
  console.log(counter);
   
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      document.getElementById(i+""+j).innerHTML = board[i][j];
    }
  }
}


function findSolution(row, col, board){
  counter++;
  while(row < 9 && board[row][col] != '.'){
    col++;
    if(col == 9){
      col = 0;
      row++;
    }
  }
  
  if(row == 9){
    return true;
  }
  
  for (var c = 1; c <= 9; c++){
    if(isValid(row, col, board, c+"")){
      board[row][col] = c+"";
      var res;
      if(col == 8){
        res = findSolution(row+1, 0, board);
      }else{
        res = findSolution(row, col+1, board);
      }
      
      if(res == true){
        return true;
      }
    }
  }
  board[row][col] = '.';
  return false;
}

function throwException(){
  throw "Invalid";
}

function isValid(row, col, board, c){
  for(var i = 0; i < 9; i++){
    if(board[row][i] == c){
      return false;
    }
    if(board[i][col] == c){
      return false;
    }
    var boxRow = Math.floor(i / 3) + (3 * Math.floor(row / 3));
    var boxCol = (i % 3) + (3 * Math.floor(col / 3));
    
    if(board[boxRow][boxCol] == c){
      return false;
    }
  }
  return true;
}
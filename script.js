var count = 0;
var selectedRow = -1;
var selectedCol = -1;
var counter = 0;


//nothing calling this function at the moment
function generateBoard(){
  var square1 = generateSquare();
  var square2 = generateSquare();
  var square3 = generateSquare();
  
  var curBoard = [[square1[0],square1[1],square1[2],'.','.','.','.','.','.'], [square1[3],square1[4],square1[5],'.','.','.','.','.','.'], [square1[6],square1[7],square1[8],'.','.','.','.','.','.'], ['.','.','.',square2[0],square2[1],square2[2],'.','.','.'], ['.','.','.',square2[3],square2[4],square2[5],'.','.','.'], ['.','.','.',square2[6],square2[7],square2[8],'.','.','.'], ['.','.','.','.','.','.',square3[0],square3[1],square3[2]], ['.','.','.','.','.','.',square3[3],square3[4],square3[5]], ['.','.','.','.','.','.',square3[6],square3[7],square3[8]]];
  counter = 0;
  findSolution(0, 0, curBoard);

  removeSquares(i, curBoard);
  for(var k = 0; k < 9; k++){
    console.log(curBoard[k]);
  }

  counter = 0;
  findSolution(0, 0, curBoard);
}



function generateSquare(){
  var square = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for(var i = 0; i < 100; i++){
    var a = Math.floor(Math.random() * 9);
    var b = Math.floor(Math.random() * 9);

    var temp = square[a];
    square[a] = square[b];
    square[b] = temp;
  }
  return square;
}



function removeSquares(k, curBoard){
  var numRemoved = 0;
  while(numRemoved < k){
    var row = Math.floor(Math.random() * 9);
    var col = Math.floor(Math.random() * 9);

    if(curBoard[row][col] != '.'){
      numRemoved++;
      curBoard[row][col] = '.';
    }
  }
}



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
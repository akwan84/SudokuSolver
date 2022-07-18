var count = 0;
var selectedRow = -1;
var selectedCol = -1;
var answer = null;
var interval;

var themeNum = 0;
var selectColour = ["#accbfa", "#c97171"];
var revealType = 0;

/*
used to generate a random sudoku board
*/
function generateBoard(k){
  answer = null;
  var square1 = generateSquare();
  var square2 = generateSquare();
  var square3 = generateSquare();
  
  var curBoard = [[square1[0],square1[1],square1[2],'.','.','.','.','.','.'], [square1[3],square1[4],square1[5],'.','.','.','.','.','.'], [square1[6],square1[7],square1[8],'.','.','.','.','.','.'], ['.','.','.',square2[0],square2[1],square2[2],'.','.','.'], ['.','.','.',square2[3],square2[4],square2[5],'.','.','.'], ['.','.','.',square2[6],square2[7],square2[8],'.','.','.'], ['.','.','.','.','.','.',square3[0],square3[1],square3[2]], ['.','.','.','.','.','.',square3[3],square3[4],square3[5]], ['.','.','.','.','.','.',square3[6],square3[7],square3[8]]];
  findSolution(0, 0, curBoard);

  removeSquares(k, curBoard);


  performReveal(curBoard);
}


/*
helper method for generateBoard, used to generate 1 square in the board
*/
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


/*
helper method for generateBoard, used to remove k random numbers from curBoard
*/
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


/*
method to clear all the values in the board
*/
function clearBoard(){
  answer = null;
  board = [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];
  performReveal(board);
}



/*
selects the clicked cell, changing the colour and setting selectedRow and selectedCol
*/
function selectCell(row, col){
  if(selectedRow != -1 && selectedCol != -1){
   document.getElementById(selectedRow + "" + selectedCol).style.backgroundColor = "";
  }
  selectedRow = row;
  selectedCol = col;
  document.getElementById(row + "" + col).style.backgroundColor = selectColour[themeNum];
  console.log(row + " " + col);
}



/*
fills the selected cell with val
*/
function fillCell(val){
  answer = null;
  if(selectedRow != -1 && selectedCol != -1){
    var id = "" + selectedRow + "" + selectedCol;
    document.getElementById(id).innerHTML = val + "";
  }
}


/*
clears the value in a the selected cell
*/
function clearCell(){
  answer = null;
  if(selectedRow != -1 && selectedCol != -1){
    var id = "" + selectedRow + "" + selectedCol;
    document.getElementById(id).innerHTML = " ";
  }
}


/*
used to get the solution to the sudoku puzzle, called in the HTML file
*/
function solve(showAnswer){
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

  if(answer == null){
    findSolution(0, 0, board);
    answer = board;
  }
   
  if(showAnswer){
    performReveal(answer);
  }else{
    if(selectedRow != -1 && selectedCol != -1){
      var id = "" + selectedRow + "" + selectedCol;
      document.getElementById(id).innerHTML = answer[selectedRow][selectedCol];
    }
  }
}

function performReveal(board){
  boardToReveal = board;
  if(revealType == 0){
    cascadeIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    interval = setInterval(cascadeReveal, 40);
  }else if(revealType == 1){
    verticalWipeIndex = 0;
    interval = setInterval(verticalWipe, 40);
  }
  if(selectedRow != -1 && selectedCol != -1){
    document.getElementById(selectedRow + "" + selectedCol).style.backgroundColor = "";
  }
  selectedRow = -1;
  selectedCol = -1;
}


/*
used to reveal the board boardToReveal in a cascading manner
*/
var boardToReveal;
var cascadeIndex;
function cascadeReveal(){
  var index = 0;
  while(index < 9 && cascadeIndex[index] != 0){
    if(cascadeIndex[index] != 9){
      if(boardToReveal[index][cascadeIndex[index]] != '.'){
        document.getElementById(index + "" + cascadeIndex[index]).innerHTML = boardToReveal[index][cascadeIndex[index]];
      }else{
        document.getElementById(index + "" + cascadeIndex[index]).innerHTML = " ";
      }
      cascadeIndex[index]++;
    }
    index++;
  }

  if(index < 9){
    if(boardToReveal[index][cascadeIndex[index]] != '.'){
      document.getElementById(index + "" + cascadeIndex[index]).innerHTML = boardToReveal[index][cascadeIndex[index]];
    }else{
      document.getElementById(index + "" + cascadeIndex[index]).innerHTML = " ";
    }
    cascadeIndex[index]++;
  }

  if(cascadeIndex[8] == 9){
    clearInterval(interval);
  }
}

var verticalWipeIndex;
function verticalWipe(){
  for(var i = 0; i < 9; i++){
    if(boardToReveal[verticalWipeIndex][i] == '.'){
      document.getElementById(verticalWipeIndex + "" + i).innerHTML = " ";
    }else{
      document.getElementById(verticalWipeIndex + "" + i).innerHTML = boardToReveal[verticalWipeIndex][i];
    }
  }
  verticalWipeIndex++;
  if(verticalWipeIndex == 9){
    clearInterval(interval);
  }
}

/*
Using backtracking to find the solution to the board given
*/
function findSolution(row, col, board){
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


/*
helper method to check whehter placing c at cell [row][col] is valid
*/
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



function changeTheme(k, id){
  document.getElementById("theme"+themeNum).style.borderColor = "";
  if(k == 0){
    themeNum = 0;
    document.getElementById("theme").setAttribute("href", "theme1.css");
  }else if(k == 1){
    themeNum = 1;
    document.getElementById("theme").setAttribute("href", "theme2.css");
  }
  document.getElementById(id).style.borderColor = "#ffffff";
}

function changeReveal(k, id){
  document.getElementById("reveal" + revealType).style.borderColor = "";
  revealType = k;
  document.getElementById(id).style.borderColor = "#ffffff";
}

function menuVis(id){
  var state = document.getElementById(id).style.visibility;
  if(state == 'visible'){
    document.getElementById(id).style.visibility = 'hidden';
  }else{
    document.getElementById(id).style.visibility = 'visible';
  }
}
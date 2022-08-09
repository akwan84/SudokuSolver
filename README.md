# Sudoku Solver
## Introduction
This is a program that solves a game of sudoku written using HTML, CSS, and Javascript. <br><br>

## How to Use
All you have to do is fill in the appropriate cells with numbers and click the "Solve" button. If the board is a valid sudoku board, the program should be able to find a solution relatively quickly. This can also be used as a sudoku aid, with the option to solve a single cell rather than the entire board. In the case where the board provided has more than 1 solution, the solver will return whichever one it finds first, so using this as an aid might not be possible if the board has more than 1 solution.  

Fun Fact: There does not exist a sudoku board with less than 16 filled cells that has a unique solution.<br><br>

## How it Works
The solution is found using a backtracking technique, which is essentially guess-and-check. I wrote this program after solving the same question on Leetcode found <a href = "https://leetcode.com/problems/sudoku-solver/"> here </a>. The idea is that we go from top to bottom, left to right. Then for each empty cell, we try each number between 1 to 9. If a particular number can be validly put at this cell, we keep the number there, and try to find a number to fill in for all the other cells, if we can't do so, we try a different number at this cell. <br><br>
What this means is that there are up to $9^{81}$ possible sudoku boards if all the cells were empty. But luckily, this many empty cells usually means there are many solutions, so finding a solution shouldn't take too long. But worst case scenario, with 65 empty cells and an unique solution, there are up to $9^{65}$, or about $10^{61}$, the solution may take a very long time to find. <br><br>

## Shortcomings
The main shortcoming of this program is that some invalid sudoku boards may not be visible with the clues given. For example (add image here):
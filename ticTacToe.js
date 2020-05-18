const gameBoard = (() => {
    let board = [
                    ["","",""],
                    ["","",""],
                    ["","",""]
                ];
    const addMark = (player, row, col) => {
        if(isEmpty(row,col)) board[row][col] = player.getMark();
    }
    const getBoard = () => board;
    const isEmpty = (row, col) => board[row][col] == "" ? true : false;
    const clearBoard = () =>{
      for(let r=0;r < board.length;r++){
        for(let c=0;c < board[0].length;c++){
            board[r][c] = ""; 
        }
      }
    }
    const isFilled = () =>{
      for(let r=0;r < board.length;r++){
        for(let c=0;c < board[0].length;c++){
            if(board[r][c] != "") return false; 
        }
      }
      return true;
    }
    const isThreeInRow = (player) =>{
        let found =true;

        for(let r=0;r < board.length;r++){
            found = true;
            for(let c=0;c < board[0].length;c++){
                if(board[r][c] != player.getMark()) found = false; 
            }
            if(found == true) return true;
        }
        for(let c=0;c < board[0].length;c++){
            found = true;
            for(let r=0;r < board.length;r++){
                if(board[r][c] != player.getMark()) found = false; 
            }
            if(found == true) return true;
        }

        let row =0;
        let col = 0;
        found =true;
        while (row <board.length && col < board[0].length){
            if(board[row][col] != player.getMark()) found = false;
            row++;
            col++;
        }
        if(found) return true;

        row = 2;
        col = 0;
        found =true;
        while (row >=0 && col < board[0].length){
            if(board[row][col] != player.getMark()) found = false;
            row--;
            col++;
        }
        if(found) return true;

        return false;

    }  

    return {
      addMark,
      getBoard,
      isThreeInRow,
      isEmpty,
      isFilled,
      clearBoard
    };
  })();

  const Player = (name, mark) => {
    let turn = false;
    let score = 0;
    const getScore = () => score;
    const getName = () => name;
    const getMark = () => mark;
    const getTurn = () => turn;
    const setTurn = (newTurn) => turn = newTurn;
    const changeTurn = () => turn = !turn;
    const addScore = () => score++;
    const resetScore =() => score = 0;


    return{getName, getMark, getTurn, changeTurn, getScore, addScore, setTurn, resetScore};
  };

  const gameState = (() => {
    const player1 = Player("Player1","X");
    const player2 = Player("Player2","O");
    let winner = "";

    player1.setTurn(true);
    
    let play = true;
    const resetGame = () =>{
      player1.setTurn(true);
      player1.resetScore()

      player2.setTurn(false);
      player2.resetScore()

      gameBoard.clearBoard();
      play = true;
      winner = "";
    }

    const newGame = () =>{
      player1.setTurn(true);
      player2.setTurn(false);
      gameBoard.clearBoard();
      play = true;
      winner = "";
    }

    const getWinner = () => winner;
    const gameOver = () =>{
      if(gameBoard.isThreeInRow(player1)){
        winner = player1.getName();
        player1.addScore();
        play = false;
      }
      else if(gameBoard.isThreeInRow(player2)){
        winner = player2.getName();
        player2.addScore();
        play = false
      }
      else if (gameBoard.isFilled()){
        play = false;
      }

    }
    const takeTurn = (row,col) =>{
      if(gameBoard.isEmpty(row,col) && play){
        if(player1.getTurn()){
          gameBoard.addMark(player1,row,col);
        }
        else{
          gameBoard.addMark(player2,row,col);
        }
        gameOver();
   
        displayController.updateDisplay();

        player1.changeTurn();
        player2.changeTurn();
      }

    }

    return {
      getWinner,
      takeTurn,
      newGame,
      resetGame,
      player1,
      player2
    };
  })();

  const displayController = (() => {
    const table = document.querySelector('#board');
    const cells = document.querySelectorAll("td");

    const score1 = document.querySelector("#score1");
    const score2 = document.querySelector("#score2");

    const start = document.querySelector("#start");
    const reset = document.querySelector("#reset");

    const winner = document.querySelector("#winner");

    const updateDisplay = () => {
        let board = gameBoard.getBoard();
        for (let i = 0; i < table.rows.length; i++) {

          let objCells = table.rows.item(i).cells;

          for (let j = 0; j < objCells.length; j++) {
              objCells.item(j).innerHTML = board[i][j];
          }
      }
      score1.innerHTML = gameState.player1.getScore();
      score2.innerHTML = gameState.player2.getScore();
      winner.innerHTML = gameState.getWinner()
    }

    start.addEventListener("click", ()=>{
      gameState.newGame();
      updateDisplay();
    })
    reset.addEventListener("click", ()=>{
      gameState.resetGame();
      updateDisplay();
    })
    cells.forEach(cell => {
      cell.addEventListener("click",() => {
        gameState.takeTurn(cell.getAttribute("data-row"),cell.getAttribute("data-col"));
      });
    });
    return {
      updateDisplay,
      winner
    };
  })();
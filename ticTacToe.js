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
    const changeTurn = () => turn = !turn;
    const addScore = () => score++;


    return{getName, getMark, getTurn, changeTurn, getScore, addScore};
  };

  const gameState = (() => {
    const player1 = Player("player1","X");
    const player2 = Player("player2","O");
    player1.changeTurn();
    
    let play = true;

    const displayWinner = (player) => console.log(player.getName());
    const gameOver = () =>{
      if(gameBoard.isThreeInRow(player1)){
        console.log(player1.getName());
        player1.addScore();
        play = false;
      }
      else if(gameBoard.isThreeInRow(player2)){
        console.log(player2.getName());
        player2.addScore();
        play = false;
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
        player1.changeTurn();
        player2.changeTurn();
      }
      gameOver();
      displayController.updateDisplay();
    }

    return {
      displayWinner,
      takeTurn
    };
  })();

  const displayController = (() => {
    const table = document.querySelector('#board');
    const cells = document.querySelectorAll("td");

    const updateDisplay = () => {
        let board = gameBoard.getBoard();
        for (let i = 0; i < table.rows.length; i++) {

          let objCells = table.rows.item(i).cells;

          for (let j = 0; j < objCells.length; j++) {
              objCells.item(j).innerHTML = board[i][j];
          }
      }
    }

    cells.forEach(cell => {
      cell.addEventListener("click",() => {
        gameState.takeTurn(cell.getAttribute("data-row"),cell.getAttribute("data-col"));
      });
    });
    return {
      updateDisplay
    };
  })();
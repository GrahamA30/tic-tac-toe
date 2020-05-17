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
      isEmpty
    };
  })();

  const Player = (name, mark) => {
    let turn = false;
    const getName = () => name;
    const getMark = () => mark;
    const getTurn = () => turn;
    const changeTurn = () => turn = !turn;

    return{getName, getMark, getTurn, changeTurn};
  };

  const gameState = (() => {
    const player1 = Player("player1","X");
    const player2 = Player("player2","O");
    player1.changeTurn();

    const displayWinner = (player) => console.log(player.getName());
    const takeTurn = (row,col) =>{
      if(gameBoard.isEmpty(row,col)){
        if(player1.getTurn()){
          gameBoard.addMark(player1,row,col);
        }
        else{
          gameBoard.addMark(player2,row,col);
        }
        player1.changeTurn();
        player2.changeTurn();
      }
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
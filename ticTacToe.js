const gameBoard = (() => {
    let board = [
                    ["X","",""],
                    ["","X",""],
                    ["X","O","O"]
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
      isThreeInRow
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
    const displayWinner = (player) => console.log(player.getName());
    const takeTurn = (player1, player2) =>{
      
    }

    return {
      displayWinner
    };
  })();

  const displayController = (() => {
    const cells = document.querySelectorAll('.cell');

    const updateDisplay = () => {
        cells.forEach(cell => {
          let row = cell.getAttribute("data-row");
          let col = cell.getAttribute("data-col");
          let board = gameBoard.getBoard();
          cell.innerHTML = board[row][col];
        });
    }

    return {
      updateDisplay
    };
  })();
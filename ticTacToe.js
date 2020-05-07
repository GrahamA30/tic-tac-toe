const gameBoard = (() => {
    let board = [
                    ["X","O","X"],
                    ["O","","O"],
                    ["O","","X"]
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
      const getName = () => name;
      const getMark = () => mark;

      return{getName, getMark};
  };

  const gameState = (() => {
    const displayWinner = (player) => console.log(player.getName());

    return {
      displayWinner
    };
  })();
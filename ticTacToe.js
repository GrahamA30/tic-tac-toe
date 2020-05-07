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

    return {
      addMark,
      getBoard
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
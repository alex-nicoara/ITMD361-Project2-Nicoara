$.noConflict();

// Reintroduce the dolalr sign scope to self executing function
(function($) {
  // variables
  var player;
  var computer;
  var hasWon;
  var board;
  var spaces_available;

  // functions
  function setOrder() {
    if(Math.round(Math.random()) === 0) {
      player = 1;
      computer = 2;
    } else {
      player = 2;
      computer = 1;
      promptCPU();
    }

    return;
  }

  function resetGame() {
    hasWon = false;
    spaces_available = [{x:0,y:0},{x:1,y:0},{x:2,y:0},
                        {x:0,y:1},{x:1,y:1},{x:2,y:1},
                        {x:0,y:2},{x:1,y:2},{x:2,y:2}];
    board = [[0,0,0],
             [0,0,0],
             [0,0,0]];

    for(var i = 1; i < 4; i++) {
      for(var j = 1; j < 4; j++) {
        $('#ts-open-'+i+'-'+j).removeClass('ts-open').removeClass('player-marker').removeClass('cpu-marker').removeClass('win-square').addClass('ts-open');
      }
    }

    setOrder();
  }

  function checkForWinner(gameboard, piece) {
    var winBool = false;

    // Horizontal/Vertical rows check
    for(var i = 0 ; i < 3; i++) {
      if(gameboard[i][0] == piece && gameboard[i][1] == piece && gameboard[i][2] == piece) {
        winBool = true;
      }

      if(gameboard[0][i] == piece && gameboard[1][i] == piece && gameboard[2][i] == piece) {
        winBool = true;
      }
    }

    // Diagonals check
    if((gameboard[0][0] == piece && gameboard[1][1] == piece && gameboard[2][2] == piece) ||
       (gameboard[2][0] == piece && gameboard[1][1] == piece && gameboard[0][2] == piece)) {
      winBool = true;
    }

    return winBool;
  }

  function getWinningSquares(gameboard, piece) {
    var seq = [];

    // Horizontal/Vertical rows check
    for(var i = 0 ; i < 3; i++) {
      if(gameboard[i][0] == piece && gameboard[i][1] == piece && gameboard[i][2] == piece) {
        seq = [[0, i], [1, i], [2, i]];
      }

      if(gameboard[0][i] == piece && gameboard[1][i] == piece && gameboard[2][i] == piece) {
        seq = [[i, 0], [i, 1], [i, 2]];
      }
    }

    // Diagonals check
    if(gameboard[0][0] == piece && gameboard[1][1] == piece && gameboard[2][2] == piece) {
      seq = [[0, 0], [1, 1], [2, 2]];
    }
    if(gameboard[2][0] == piece && gameboard[1][1] == piece && gameboard[0][2] == piece) {
      seq = [[0, 2], [1, 1], [2, 0]];
    }

    return seq;
  }

  function removeAvailableSpace(nx, ny) {
    var xs;
    for(var i = 0; i < spaces_available.length; i++) {
      if(spaces_available[i].x == nx && spaces_available[i].y == ny) {
        xs = i;
      }
    }

    spaces_available.splice(xs, 1);
    return;
  }

  function promptCPU() {
    var rn = Math.round(Math.random()*(spaces_available.length-1)); // Random AI, so not impossible
    var x = spaces_available[rn].x;
    var y = spaces_available[rn].y;
    var CPcanWin = false;

    // If the CPU sees an opportunity to win, takes it
    for(var i = 0; i < spaces_available.length; i++) {
      var sx = spaces_available[i].x;
      var sy = spaces_available[i].y;
      var boardCopy = board.slice();
      boardCopy[sy][sx] = computer;

      if(checkForWinner(boardCopy, computer) == true) {
        x = sx;
        y = sy;
        CPcanWin = true;
        break;
      }

      // so we don't fill the boardCopy array
      boardCopy[sy][sx] = 0;
    }

    if(CPcanWin == false) {
      // check to see if player can win, block player
      for(var i = 0; i < spaces_available.length; i++) {
        var px = spaces_available[i].x;
        var py = spaces_available[i].y;
        var boardCopy2 = board.slice();
        boardCopy2[py][px] = player;

        if(checkForWinner(boardCopy2, player) == true) {
          x = px;
          y = py;
          break;
        }

        // so we don't fill the boardCopy array
        boardCopy2[py][px] = 0;
      }
    }

    $('#ts-open-'+(x+1)+'-'+(y+1)).removeClass('ts-open').addClass('cpu-marker');
    board[y][x] = computer;
    removeAvailableSpace(x, y);

    return;
  }

  function playerMove(i, j) {
    // Check if square is open; if not, leave...
    if($('#ts-open-'+i+'-'+j).hasClass('ts-open') == false) {
      return;
    }

    // If open, place a marker down
    $('#ts-open-'+i+'-'+j).removeClass('ts-open').addClass('player-marker');
    var nx = i-1;
    var ny = j-1;
    removeAvailableSpace(nx, ny);
    board[ny][nx] = player;
    if(checkForWinner(board, player) == true) {
      endGame(player);
      return;
    }
    if(spaces_available.length == 0) { endGame(0); return; }

    // prompt CPU to move before player can move again...
    promptCPU();
    if(checkForWinner(board, computer) == true) {
      endGame(computer);
      return;
    }
    if(spaces_available.length == 0) { endGame(0); return; }

    return;
  }

  function endGame(winner) {
    // make all pieces unclickable
    for(var i = 1; i < 4; i++) {
      for(var j = 1; j < 4; j++) {
        $('#ts-open-'+i+'-'+j).removeClass('ts-open');
      }
    }

    // if it's a tie
    if(winner == 0) {
    // alert("It's a tie!");
      return;
    }

    // if we have a winner, mark the spaces
    var wsquares = getWinningSquares(board, winner);
    for(var v = 0; v < 3; v++) {
      $('#ts-open-'+(wsquares[v][0]+1)+'-'+(wsquares[v][1]+1)).addClass('win-square');
    }

    return;
  }

  // actions
  resetGame();

  // event listeners


})(jQuery);

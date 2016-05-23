var BoggleSolver = (function() {
  var iterator = 0,
    dx = [0, 1, 1, 1, 0, -1, -1, -1],
    dy = [-1, -1, 0, 1, 1, 1, 0, -1];

  /*
   *generates the neighbor of th current candidate
   */
  function _next(candidate) {
    var n = this.board.length,
      x = parseInt(candidate % n),
      y = parseInt(candidate / n),
      map = new Array(n);

    for (var i = 0; i < n; i++) {
      map[i] = new Array(n);
      for (var j = 0; j < n; j++) {
        map[i][j] = i * n + j;
      }
    }

    while (iterator < 8) {
      var xnext = x + dx[iterator],
        ynext = y + dy[iterator];

      iterator++;

      if (xnext < 0 || xnext >= n || ynext < 0 || ynext >= n) {
        continue;
      }

      return map[ynext][xnext];
    }

    iterator = 0;
    return null;
  }

  /*
   *returns the character on a given position
   */
  function _charAt(pos) {
    var n = this.board.length,
      x = parseInt(pos % n),
      y = parseInt(pos / n);
    return this.board[y][x];
  }

  //BoggleSolver object
  function BoggleSolver(dict, board) {
    this.dict = dict;
    this.board = board;

    /*
     *solves a given boggle via iterative method
     */
    this.solve = () => {
      var n = this.board.length,
        dim = n * n,
        nopts = new Array(dim + 2),
        options = new Array(dim + 2),
        node = this.dict,
        move,
        count,
        words = [];

      for (var i = 0; i < dim + 2; i++) {
        options[i] = new Array(dim + 2);
      }

      nopts[0] = move = 1;
      nopts[move] = count = 0;
      for (var i = dim - 1; i >= 0; i--) {
        nopts[move]++;
        options[move][nopts[move]] = i;
      }

      while (nopts[0] > 0) {
        if (nopts[move] > 0) {
          var tos = options[move][nopts[move]];
          move++;
          nopts[move] = 0;

          if (move > 3) {
            var word = '';
            for (var i = 1; i < move; i++) {
              word += _charAt.call(this, options[i][nopts[i]]);
            }
            if (this.dict.contains(word)) {
              count++;
              words.push(word);
            }
          }

          node = this.dict;
          for (var i = 1; i < move; i++) {
            node = node.next(_charAt.call(this, options[i][nopts[i]]));
          }

          for (var candidate = _next.call(this, tos); candidate !== null; candidate = _next.call(this, tos)) {
            var visited = false,
              str = '';
            for (var i = move - 1; i >= 1; i--) {
              if (candidate == options[i][nopts[i]]) {
                visited = true;
                break;
              }
            }

            if (!visited && node.has(_charAt.call(this, candidate))) {
              nopts[move]++;
              options[move][nopts[move]] = candidate;
            }
          }

        } else {
          move--;
          nopts[move]--;
        }
      }

      return {
        'count': count,
        'words': words
      }
    }
  }

  return BoggleSolver;
})();

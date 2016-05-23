var dict, input_board, result;
read_file('./dict.txt', dict_handler);

function process_result(res) {
  $('#res-count').text('List of Words: ' + res.count);
  res.words
    .sort((a, b) => a.length - b.length)
    .filter((item, idx, arr) => idx == arr.indexOf(item))
    .forEach(word => {
      var score;
      if (word.length <= 4) score = 1;
      else if (word.length === 5) score = 2;
      else if (word.length === 6) score = 3;
      else score = 5;
      $('#res-words').append('<a href="#!" class="collection-item">' + word + '<span class="badge">' + score + ' point</span></a>');
    });
}

function read_file(file, fn) {
  $.get(file).success(data => fn(data)).error(() => {
    Materialize.toast('There was an error in loading ' + file, 1500);
    return false;
  });
}

function dict_handler(data) {
  dict = new Trie();
  data
    .trim()
    .split(/\r\n|\n|\r/)
    .map(elt => {
      return elt.trim();
    })
    .forEach(elt => {
      dict.add(elt);
    });

  read_file('./input.txt', input_handler);
}

function input_handler(data) {
  var input = data.trim().split(/\r\n|\n|\r/),
    n = +input.shift(),
    board = new Array(n);

  for (var i = 0; i < n; i++) board[i] = input.shift().split(' ');

  fill_board(board);
  result = new BoggleSolver(dict, board).solve();
  process_result(result);
}

function get_board() {
  var input = $('.boggle-cell'),
    n = Math.sqrt(input.length),
    board = new Array(n);

  for (var i = 0; i < n; i++) board[i] = new Array(n);

  for (var i = 0; i < input.length; i++) board[parseInt(i / n)][parseInt(i % n)] = input[i].value;

  return board;
}

function fill_board(board) {
  var grid = $('#boggle-grid'),
    n = board.length;

  grid.append('<tbody></tbody>');
  for (var i = 0; i < n; i++) {
    var row = '<tr>';
    for (var j = 0; j < n; j++) row += '<td> <input disabled type="text" class="boggle-cell" value="' + board[i][j] + '"></td>';
    row += '</tr>';
    grid.children().append(row);
  }

}

function count_down() {
  var seconds = 1,
    minutes = parseInt(seconds / 60),
    counter = setInterval(timer, 1000);

  function timer() {
    var s = seconds % 60;
    $('#time').text('' + minutes + ':' + ((s < 10) ? '0' + s : s));
    seconds--;
    minutes = parseInt(seconds / 60);
    if (seconds === 0) {
      clearInterval(counter);
      return false;
    }
  }
}

function shuffle() {
  var board = $('.boggle-cell');
  for (var i = 0; i < board.length; i++) board[i].value = String.fromCharCode(Math.floor(Math.random() * 26) + 'A'.charCodeAt());
}

function play() {
  $('#res-count').html('');
  $('#res-words').html('');
  shuffle();
  count_down();
  $('#score-form').show();

  return false;
}

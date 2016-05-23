(function () {
	var dict;

  function read_dict_file (file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.overrideMimeType('text/plain');
    rawFile.send(null);

    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var text = rawFile.responseText;
					dict = new Trie();
          text
            .split('\n')
            .map(elt => {
              return elt.trim();
            })
            .forEach(elt => {
              dict.add(elt);
            });
        }
      }
    }

  }

  function input_handler (e) {
    var file = e.target.files[0],
      reader = new FileReader();

    reader.onload = e => {
      var text = e.target.result;
			var input = text.trim().split(/\r\n|\n|\r/);
      var test_cases = +input.shift();

      for (var i = 0; i < test_cases; i++) {
        var n = +input.shift(), board = [];
        for (var j = 0; j < n; j++) {
          board[j] = input.shift().split(' ');
        }
        //solve board
        board.forEach(rows => {
          console.log(JSON.stringify(rows));
        });

        var ret = new BoggleSolver(dict, board).solve();

        if (ret.count === 0) {
					$('#result').append('<p>No valid words found</p>');
        } else {
					$('#result').append('<h2>' + ret.count + ' valid words</h2>');
          ret.words.forEach(word => {
						$('#result').append('<p>' + word + '</p>');
					});
        }
      }

    }

    reader.readAsText(file);
  }

  read_dict_file('./dict.txt');
	$('#input').trigger('change');
	$('#input').on('change', input_handler);

})();

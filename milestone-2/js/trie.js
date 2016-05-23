var Trie = (function () {
	var ALPHABET_SIZE = 26,
		ASCII_OFFSET = 'A'.charCodeAt();

	function Trie () {
		this.children = null;
		this.$ = false;
	}

	(function () {
		/*
		 *adds a word to the trie
		 */
		this.add = function (word) {
			var curr = this, index;

			for (var i = 0; i < word.length; i++) {
				index = word.charCodeAt(i) - ASCII_OFFSET;
				if (curr.children == null) { // initial Trie
					curr.children = new Array(ALPHABET_SIZE);
					curr = curr.children[index] = new Trie();
				} else if (curr.children[index]) { // traverse
					curr = curr.children[index];
				} else { // add new letter
					curr = curr.children[index] = new Trie();
				}
			}

			curr.$ = true;
			return curr;
		};
		/*
		 *checks if trie has a child 'c'
		 */
		this.has = function (c) {
			return this.next(c) !== undefined;
		};
		/*
		 *returns the child 'c'
		 */
		this.next = function (c) {
			if (this.children) {
				return this.children[c.charCodeAt() - ASCII_OFFSET];
			}
			return undefined;
		};
		/*
		 *checks if a string exists as a branch within the trie
		 */
		this.is_branch = function (str) {
			var curr = this;
			for (var i = 0; i < str.length; i++) {
				if (!curr.has(str[i])) {
					return false;
				}
				curr = curr.next(str[i]);
			}
			return true;
		}
		/*
		 *checks if a word is valid
		 */
		this.contains = function (word) {
			var curr = this, index;

			for (var i = 0; i < word.length; i++) {
				if (!curr.has(word[i])) {
					return false;
				}
				curr = curr.next(word[i]);
			}

			return curr.$;
		};

	}).call(Trie.prototype);

	return Trie;
})();


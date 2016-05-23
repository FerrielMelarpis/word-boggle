#include "util.h"

// helper functions
/**
 * function that checks if a word
 * exists in the dictionary
 */
boolean
is_accepted(char *dict[DICT_SIZE], char *word)
{
    int i;
    for (i = 0; i < DICT_SIZE; i++) { if (strcmp(dict[i], word) == 0) { return true; } }
    return false;
}

/**
 * function that returns the next candidate
 */
int
_next(int n, int candidate)
{
	static int iterator = 0;
	const int dx[8] = { 0, 1, 1, 1, 0, -1, -1, -1 };
	const int dy[8] = { -1, -1, 0, 1, 1, 1, 0, -1 };
	const int x = (candidate - 1) % n, y = (candidate - 1) / n;
	int map[n][n];
	int i, j, xnext, ynext;

	for (i = 0; i < n; i++) { for (j = 0; j < n; j++) { map[i][j] = i * n + j + 1; } }

	while (iterator < 8) {
		xnext = x + dx[iterator];
		ynext = y + dy[iterator];

		iterator++;

		if (xnext < 0 || xnext >= n || ynext < 0 || ynext >= n) {
			continue;
		}
		return map[ynext][xnext];
	}

	return (iterator = 0);
}

/**
 * function that finds all valid words in the boggle
 */
int
findWords(int n, char boggle[n][n])
{
	const int dim = n * n;
	int nopts[dim + 2];
	int option[dim + 2][dim + 2];
	int i, candidate, count, move;

	count = 0;
	nopts[0] = move = 1;
  nopts[move] = 0;
  for (i = n * n; i >= 1; i--) {
    nopts[move]++;
    option[move][nopts[move]] = i;
  }

	while (nopts[0] > 0) {
		if (nopts[move] > 0) {
			move++;
			nopts[move] = 0;
			// print solutions
			if (move > 3) {
				char word[dim + 1];
				for (i = 1; i < move; i++) {
					int pos = option[i][nopts[i]] - 1;
					word[i - 1] = boggle[pos / n][pos % n];
				}
				word[i - 1] = '\0';
				if (is_accepted(dict, word)) { printf("\x1b[32m%s\x1b[0m\n", word); count++; }
			}
			// generate candidates
			// if (move == 1) {
			// 	for (candidate = dim; candidate >= 1; candidate--) {
			// 		nopts[move]++;
			// 		option[move][nopts[move]] = candidate;
			// 	}
			// } else {
				int tos = option[move - 1][nopts[move - 1]];

				for (candidate = _next(n, tos); candidate != 0; candidate = _next(n, tos)) {
					for (i = move - 1; i >= 1; i--) { if (candidate == option[i][nopts[i]]) { break; } }
					if (i == 0) {
						nopts[move]++;
						option[move][nopts[move]] = candidate;
					}
				}
			// }
		} else {
			move--;
			nopts[move]--;
		}
	}

	return count;
}

/**
 * function that reads the dictionary file and
 * stores the words to an array of strings
 */
void
read_dict_file(const char *filename, char *dict[DICT_SIZE])
{
  FILE *file = fopen(filename, "r");
  int i = 0;
  errno = 0;
  if (file) {
    while (!feof(file)) { if (fscanf(file, "%ms", &dict[i++]) == EOF) { perror("fscanf"); } }
    fclose(file);
  } else { perror("fopen"); }
}

/**
 * function for freeing the memory
 * allocated for the strings
 */
void
delete_dict(char *dict[DICT_SIZE])
{
  int i;
  for (i = 0; i < DICT_SIZE; i++) { free(dict[i]); }
}

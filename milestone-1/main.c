#include "util.h"

int main(int argc, const char *argv[])
{
  if (argc != 3) { // informs the user on the program usage
    fprintf(stderr, "Usage: %s <dictionary file> <input file>\n", argv[0]);
    exit(-1);
  }
	int nwords, t, n, i, j;
  FILE *infile = fopen(argv[2], "r");
  read_dict_file(argv[1], dict);
  fscanf(infile, " %d", &t);
  while (t--) {
    fscanf(infile, " %d", &n);
    char boggle[n][n];
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        fscanf(infile, " %c", &boggle[i][j]);
        printf("%2c", boggle[i][j]);
      }
      printf("\n");
    }
  	nwords = findWords(n, boggle);
  	if (nwords == 0) { printf("No valid words found!\n"); }
  	else { printf("Total no. of words: %d\n", nwords); }
  }
  fclose(infile);
  delete_dict(dict);

  return 0;
}

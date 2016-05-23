#ifndef _UTIL_H_
#define _UTIL_H_

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

#define DICT_SIZE 178690

enum boolean { false, true };
typedef enum boolean boolean;
char *dict[DICT_SIZE];

void read_dict_file(const char *filename, char *dict[DICT_SIZE]);
void delete_dict(char *dict[DICT_SIZE]);
boolean is_accepted(char *dict[DICT_SIZE], char *word);
int findWords(int n, char boggle[n][n]);

#endif // _UTIL_H_

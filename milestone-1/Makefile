SHELL = /bin/sh
CC = gcc
CFLAGS = -g -O2 -Wall -pg
OBJDIR := debug
OBJ := $(addprefix $(OBJDIR)/, main.o util.o)
OUTPUT = boggle-solver
.SUFFIXES :
.SUFFIXES : .c .o

$(OBJDIR)/%.o : %.c
	$(CC) $(CFLAGS) -c -o $@ $<

$(OUTPUT) : $(OBJ)
	$(CC) $(CFLAGS) -o $(OUTPUT) $(OBJ)

$(OBJ) : | $(OBJDIR)
$(OBJDIR) :
	mkdir $(OBJDIR)


.PHONE : clean
clean:
	-rm $(OUTPUT) *.out -r $(OBJDIR)

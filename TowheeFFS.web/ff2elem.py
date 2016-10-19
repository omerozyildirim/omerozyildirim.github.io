#! /usr/bin/python3
import sys
#import string
import os

def find_in_list(dummy, dummylist):
	result = False
	for elem in dummylist:
		if dummy == elem:
			result = True
			break

	return result

# Interpreting the command line parameters
if len(sys.argv) < 2:
	print("You should provide a file name to process!")
	exit()
else:
	filename = sys.argv[1]

elemlist1 = []
elemlist2 = []
file = open(filename)
flag = False
for line in file:
	if flag:
		elemlist1.append(line[:-1].replace(" ", ""))
		flag = False

	if line.find("Element") != -1:
		flag = True

for elem in elemlist1:
	if not find_in_list(elem, elemlist2):
		elemlist2.append(elem)

print("{ffname:'", filename, "', nblist:", elemlist2, "},", sep="")

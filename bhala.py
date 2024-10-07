import sys
if len(sys.argv) > 1:
	new_entry = sys.argv[1]
with open("edolweni.txt","a") as file:
	file.writelines("\n"+new_entry)
	

with open("edolweni.txt", "r") as file:
	print(file.readlines())

import sys
import requests
import json

API_URL = "http://127.0.0.1:5000"


def add_debtor(name, amount):
	url = f"{API_URL}/add"
	request_body = {
		"name": name,
		"amount": amount
	}

	# send post request to /add url
	response = requests.post(url, json=request_body)

	# process response and report to user
	if response.status_code == 201:
		print("Debtor '"+name+"' added successfully. Balance: "+str(amount))
		print(response.json())
	elif response.status_code == 400:
		print("failed operation")
		print(response.json())

def view_all_debtors():
	url = f"{API_URL}/view"
	# send get request to /view url
	response = requests.get(url)
	print("all debtors: \n")
	print(response.text)



# # add debtor 
# with open("edolweni.txt","a") as file:
# 	file.writelines("\n"+new_entry)
	
# # show all debtors
# with open("edolweni.txt", "r") as file:
# 	print(file.readlines())


if __name__ == "__main__":
	if len(sys.argv) > 1:
		new_entry = sys.argv[1].replace("R", "")
		name, amount = new_entry.split("-")
		add_debtor(name, amount)
		view_all_debtors()
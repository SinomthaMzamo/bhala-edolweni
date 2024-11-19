import sys
import requests
import json
from functools import reduce
import cmd

API_URL = "http://127.0.0.1:5000"


def add_debtor(name, amount):
    url = f"{API_URL}/add"
    request_body = {
        "name": name,
        "amount": amount
    }

    # send post request to /add url
    response = requests.post(url, json=request_body)

    try:
        response_data = response.json()

        if response.status_code == 201:
            message = response_data.get("message")
            debtor_data = response_data.get("data", {})
            debtor_name = debtor_data.get("name")
            debtor_amount = debtor_data.get("amount")

            print(f"{message}\nDebtor Name: {debtor_name}\nBalance: R{debtor_amount:.2f}")

        elif response.status_code == 400:
            error_message = response_data.get("error")
            print(f"{error_message}\n Made a typo? Try a different name or choose to update the debtor named {name.capitalize()} to proceed.")
        else:
            print('Something went wrong and we are working on it. Try again later.')
    except json.JSONDecodeError:
        print('An error occurred. Try again later.')

def view_all_debtors():
    url = f"{API_URL}/view"
    # send get request to /view url
    response = requests.get(url)
    try:
        response_data = response.json()
        if response.status_code == 204:
            print(response_data.get("message"))
        elif response.status_code == 200:
            debtors = response_data.get("data")
            print(f"Total: R{reduce(lambda x, y: x + y.get('amount', 0), debtors, 0):.2f}")
            print(f"+ {'+':>35}")
            print(f"\n| {f'ALL DEBTORS ({len(debtors)})':^33} |")
            print(f"| {'Name':<15} | {'Balance (R)':>15} |")
            for debtor in debtors:
                amount, name = debtor.get('amount'), debtor.get('name')
                formatted_amount, formatted_name = f"R{amount:.2f}", name.capitalize()
                print(f"| {debtor.get('name').capitalize():<15} | {formatted_amount:>15} |")
            print()
        elif response.status_code == 204:
            print('\nYou currently have no debtors saved. Add a debtor to get started\n')
    except json.JSONDecodeError:
        print('An error occurred. Try again later.')

def view_debtor(name):
    url = f"{API_URL}/view/{name}"
    # send get request to view/<name> url
    response = requests.get(url)
    try:
        response_data = response.json()
        if response.status_code == 404:
            print(response_data.get("error"),"\n")
        elif response.status_code == 200:
            debtor = response_data.get("data")
            debtor_name = debtor.get("name")
            debtor_amount = debtor.get("amount")
            print(f"\n|+ {'Single Account View':^31} +|")
            print(f"Debtor Name: {debtor_name}\nBalance: R{debtor_amount:.2f}\n")

    except json.JSONDecodeError:
        print('An error occurred. Try again later.')

def update_debtor(name, amount, operation):
    url = f"{API_URL}/update"
    request_body = {
        "name": name,
        "amount": amount,
        "operation": operation
    }

    # send put request to /update url
    response = requests.put(url, json=request_body)

    try:
        response_data = response.json()

        if response.status_code == 200:
            message = response_data.get("message")
            debtor_data = response_data.get("data", {})
            debtor_name = debtor_data.get("name")
            debtor_amount = debtor_data.get("amount")

            print(f"{message}\nDebtor Name: {debtor_name}\nBalance: {debtor_amount}")
        elif response.status_code == 404:
            error_message = response_data.get("error")
            print(
                f"{error_message}\n Made a typo? Try a different name or create a new debtor under the name '{debtor_name.captitalize()}'.")
        else:
            print('Something went wrong and we are working on it. Try again later.')
    except json.JSONDecodeError:
        print('An error occurred. Try again later.')

def delete_debtor(name):
    url = f"{API_URL}/delete/{name}"

    response = requests.delete(url)
    try:
        response_data = response.json()
        if response.status_code == 404:
            print(response_data.get("error"), "\n")
            view_debtor(name)
        elif response.status_code == 200:
            print(response_data.get("message"))
        elif response.status_code == 422:
            print(response_data.get("error"), "\n")
            print("Try reducing the balance to zero and then try again.")
    except json.JSONDecodeError as jde:
        print('An error occurred. Try again later.', response.text)

def confirm_user_selection(action):
    proceed = input("Please confirm, would you like to save these changes? (y/n): ")
    if proceed.lower() == "y":
        return True
    elif proceed.lower() == "n":
        return False
    else:
        print(f"'{proceed}' is not a valid selection. Please enter 'y' for (yes, save my changes) "
           f"or 'n' for (no, cancel my changes).")
        return -1


class EdolweniCLI(cmd.Cmd):
    intro = 'Welcome to the "Bhala edolweni" debtors manager CLI. Type help or ? to list commands.\n'
    prompt = '(bhala-edolweni)'
    aliases = {
        'add': ['create', 'new', '+'],
        'list': ['view', 'show', 'display', 'ls'],
        'reduce': ['decrease', 'rd', '--'],
        'increase': ['inc', '++', 'i'],
        'set': ['override', '__'],
        'delete': ['remove', 'settle', 'erase', 'close', 'clear', 'rm'],
        'exit': ['quit', 'shutdown', 'x', 'q'],
        'help': ['?']
    }

    def do_add(self, arg):
        """
        Add a debtor with their amount.
        Usage: add <name>-<amount>, eg. add sinomtha mzamo-12
        Aliases: create, new, +
        """
        args = arg.split("-")
        if len(args) != 2:
            print("Usage: add, create, new, + <name>-<amount>,  eg. add sinomtha mzamo-12")
            return
        name, amount = args
        try:
            amount = float(amount)
            proceed = confirm_user_selection("")
            if proceed:
                # call the api to add debtor?
                add_debtor(name, amount)
            elif proceed is None:
                self.do_add(arg)
            else:
                print('Operation cancelled.')
                return
        except ValueError:
            print("Invalid amount. Please enter a valid number.")

    def do_list(self, arg):
        """
        List all debtors or view a specific debtor by name.
        Usage: list or ls
        Aliases: view, show, display, ls
        """
        if not arg:
            view_all_debtors()
        else:
            view_debtor(arg)

    def do_reduce(self, arg):
        """
        Reduce a debtor's amount.
        Usage: reduce <name>-<amount>, eg. reduce sinomtha mzamo-12
        Aliases: rd, --, decrease
        """
        args = arg.split("-")
        if len(args) != 2:
            print("Usage: reduce, rd or -- <name>-<amount>,  eg. reduce sinomtha mzamo-12")
            return
        name, amount = args
        try:
            amount = float(amount)
            proceed = confirm_user_selection("")
            if proceed:
                # call the api to update debtor?
                update_debtor(name, amount, 'reduce')
            elif proceed is None:
                self.do_reduce(arg)
            else:
                print('Operation cancelled.')
                return
        except ValueError:
            print("Invalid amount. Please enter a valid number.")

    def do_increase(self, arg):
        """
        Increase a debtor's amount.
        Usage: increase <name>-<amount>, eg. increase sinomtha mzamo-12
        Aliases: inc, i, ++
        """
        args = arg.split("-")
        if len(args) != 2:
            print("Usage: increase, inc, ++ or i <name>-<amount>,  eg. increase sinomtha mzamo-12")
            return
        name, amount = args
        try:
            amount = float(amount)
            proceed = confirm_user_selection("")
            if proceed:
                # call the api to update debtor?
                update_debtor(name, amount, 'increase')
            elif proceed is None:
                self.do_increase(arg)
            else:
                print('Operation cancelled.')
                return
        except ValueError:
            print("Invalid amount. Please enter a valid number.")

    def do_set(self, arg):
        """
        Set a debtor's amount (override current balance).
        Usage: set, override or s <name>-<amount>, eg. set sinomtha mzamo-12
        Aliases: override, __
        """
        args = arg.split("-")
        if len(args) != 2:
            print("Usage: set, override or s <name>-<amount>,  eg. set sinomtha mzamo-12")
            return
        name, amount = args
        try:
            amount = float(amount)
            proceed = confirm_user_selection("")
            if proceed:
                # call the api to update debtor?
                update_debtor(name, amount, 'set')
            elif proceed is None:
                self.do_set(arg)
            else:
                print('Operation cancelled.')
                return
        except ValueError:
            print("Invalid amount. Please enter a valid number.")

    def do_delete(self, arg):
        """
        Delete or settle a debtor.
        Usage: delete, remove, settle <name>, eg. settle sinomtha mzamo-12
        Aliases: remove, settle, erase, rm, close, clear
        """
        print(arg)
        if not arg:
            print("Usage: delete, remove, settle, rm, erase, clear <name>,  eg. settle sinomtha mzamo-12")
            return
        try:
            proceed = confirm_user_selection("")
            if proceed:
                # call the api to delete debtor?
                delete_debtor(arg)
            elif proceed is None:
                self.do_delete(arg)
            else:
                print('Operation cancelled.')
                return
        except ValueError:
            print("Invalid amount. Please enter a valid number.")

    # Define a command to exit the CLI
    def do_exit(self, arg):
        """
        Exit the CLI.
        Usage: exit
        Aliases: quit, shutdown, x, q
        """
        print("Exiting...")
        return True  # This stops the cmd loop

    def default(self, line):
        """Handle commands that don't match any do_* method or alias."""
        # Check if the input matches any alias
        cmd_arg = line.split(' ', 1)
        for command, alias_list in self.aliases.items():
            if cmd_arg[0] in alias_list or cmd_arg[0] == command:
                if command == "exit":  # Check if the command is an exit command
                    return self.do_exit('')

                # Check if there are additional arguments
                if len(cmd_arg) > 1:
                    getattr(self, f"do_{command}")(cmd_arg[1])
                else:
                    getattr(self, f"do_{command}")('')
                return
        # If no alias or command matches, display an error message
        print(f"Command '{line}' not recognized.\n")

if __name__ == "__main__":
    print(sys.argv)
    if len(sys.argv) > 1:
        new_entry = sys.argv[1].replace("R", "")
        debtor_name, debtor_amount = new_entry.split("-")
        selection_is_confirmed = confirm_user_selection('')
        if selection_is_confirmed:
            add_debtor(debtor_name, int(debtor_amount))
            view_all_debtors()
            run_cli = input('Enter "run" to start the Bhala Edolweni CLI program. Press Enter to cancel.')
            if run_cli.lower() == 'run':
                EdolweniCLI().cmdloop() 
    elif len(sys.argv) == 1:
        EdolweniCLI().cmdloop()
import json
def load_json(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)

    if isinstance(data, list):
        return data
    else:
        raise ValueError("The JSON file does not contain a list.")

def dump_json(file_path, data):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)

file_path = "./data/sample.json"

# here the business logic is defined
class DebtorsManagementService:
    def __init__(self):
        # sample json array data
        self.debtors = load_json(file_path)
        self.backup_data = []

    def view_all_debtors(self):
        if len(self.debtors) == 0:
            return {"message": "No debtors exist, add a debtor first."}, 200

        return {"message": "Debtor data retrieved successfully ("+str(len(self.debtors))+")",
                "data": self.debtors}, 201
    
    def view_debtor(self, name):
        if not self.is_name_in_debtors(name):
            return {"error": "Debtor '"+name+"' not found."}, 404

        debtor = self.get_debtor(name)
        return {"message": "Debtor, " +name+ " information retrieved successfully", "data": debtor }, 201
    
    def add_debtor(self, name, amount):
        if self.is_name_in_debtors(name):
            return {"error": "Debtor by that name already exists"}, 400
        
        debtor_data = self.create_new_debtor_entry(name, amount)
        self.debtors.append(debtor_data)
        self.manage_cache(debtor_data)
        dump_json(file_path, self.debtors)

        return {"message": "Debtor, " +name+ " added successfully", "data": debtor_data }, 201

    def edit_debtor_name(self, name, new_name):
        if not self.is_name_in_debtors(name):
            return {"error": "Debtor '"+name+"' not found."}, 404

        debtor = self.get_debtor(name)
        debtor_index = self.debtors.index(debtor)
        debtor["name"] = new_name
        self.debtors[debtor_index] = debtor
        dump_json(file_path, self.debtors)

        return {"message": "Debtor, '" +name+ "' changed to '" +new_name+ "' successfully", "data": debtor }, 200


    def reduce_debtor_debt(self, name, settlement):
        if not self.is_name_in_debtors(name):
            return {"error": "Debtor '"+name+"' not found."}, 404

        debtor = self.get_debtor(name)
        debtor_index = self.debtors.index(debtor)
        debtor_balance = int(debtor.get("amount"))
        debtor_balance -= settlement
        debtor["amount"] = str(debtor_balance)
        self.debtors[debtor_index] = debtor
        dump_json(file_path, self.debtors)

        return {"message": "Debtor, '" +name+ "' balance updated to '" +str(debtor_balance)+ "' successfully", "data": debtor }, 200

    def increase_debtor_debt(self, name, increment):
        if not self.is_name_in_debtors(name):
            return {"error": "Debtor '"+name+"' not found."}, 404

        debtor = self.get_debtor(name)
        debtor_index = self.debtors.index(debtor)
        debtor_balance = int(debtor.get("amount"))
        debtor_balance += increment
        debtor["amount"] = str(debtor_balance)
        self.debtors[debtor_index] = debtor
        dump_json(file_path, self.debtors)

        return {"message": "Debtor, '" +name+ "' balance updated to '" +str(debtor_balance)+ "' successfully", "data": debtor }, 200
        
    def remove_debtor(self, name):
        if not self.is_name_in_debtors(name):
            return {"error": "Debtor '"+name+"' not found."}, 404
    
        debtor = self.get_debtor(name)
        self.debtors.remove(debtor)
        dump_json(file_path, self.debtors)
        return {"message": "Debtor, " +name+ " removed successfully", "data": debtor }, 201

    
    # this is a private method, has side-effect: updates cache when accessing a debtor
    def get_debtor(self, name):
        debtor = list(filter(lambda entry: entry.get("name")==name, self.debtors))[0]
        self.manage_cache(debtor)
        return debtor

    def get_debtors(self):
        return self.debtors
        
    def is_name_in_debtors(self, name):
        return any(debtor.get("name") == name for debtor in self.debtors)


    def create_new_debtor_entry(self, name, amount):
        return { "name": name, "amount": amount }

    def manage_cache(self, debtor):
        # 1. if a debtor is in cache remove it
        if debtor in self.backup_data:
            self.backup_data.remove(debtor)
            print(debtor.get("name"), "prepared for update in cache")
        # 2. append the debtor to cache,
        self.backup_data.append(debtor)
        print(debtor, "captured in cache")
        print("cache: \n", self.backup_data)  


       

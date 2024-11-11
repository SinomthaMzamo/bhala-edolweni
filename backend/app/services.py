from .data_models import Debtor, db

class DebtorsManagementService:
    """
        Service class for managing debtors in the system's database.
        Provides methods to view, add, update, and delete debtor records.
    """

    def view_debtor(self, name):
        """
        Retrieve information about a specific debtor by their name.

        Args:
            name (str): The name of the debtor.

        Returns:
            dict: A response containing debtor information or an error message.
            int: HTTP status code indicating the result of the operation.
        """
        debtor = Debtor.query.filter_by(name=name).first()

        if not debtor:
            return {"error": f"Debtor '{name}' not found."}, 404

        return {"message": f"Debtor '{name}' information retrieved successfully",
                "data": {"name": debtor.name, "amount": debtor.amount}}, 201

    def view_all_debtors(self):
        """
        Retrieve a list of all debtors in the system.

        Returns:
            dict: A response containing a list of all debtors or a message if no debtors exist.
            int: HTTP status code indicating the result of the operation.
        """
        no_debtors_found_code = 200
        debtors_found_code = 201

        debtors = Debtor.query.all()

        if len(debtors) == 0:
            return {"message": "No debtors exist, add a debtor first."}, no_debtors_found_code
        debtors_data_as_json_array = [{'name': d.name, 'amount': d.amount} for d in debtors]

        return {"message": f"Debtor data retrieved successfully ({len(debtors)})",
                "data": debtors_data_as_json_array}, debtors_found_code

    def add_debtor(self, name, amount):
        """
        Add a new debtor to the system.

        Args:
            name (str): The name of the new debtor.
            amount (float): The amount owed by the debtor.

        Returns:
            dict: A response indicating success or failure of the operation.
            int: HTTP status code indicating the result of the operation.
        """
        if Debtor.query.filter_by(name=name).first():
            return {"error": "A Debtor by that name already exists"}, 400

        new_debtor = Debtor(name=name, amount=amount)
        db.session.add(new_debtor)
        db.session.commit()

        return {"message": f"Debtor '{name}' added successfully", "data": {"name": name, "amount": amount}}, 201

    def update_debtor(self, name, amount):
        """
            Add a new debtor to the system.

            Args:
                name (str): The name of the new debtor.
                amount (float): The amount owed by the debtor.

            Returns:
                dict: A response indicating success or failure of the operation.
                int: HTTP status code indicating the result of the operation.
            """
        requested_debtor = Debtor.query.filter_by(name=name).first()
        if not requested_debtor:
            return {"message": "Debtor not found!"}, 404

        requested_debtor.amount = amount
        db.session.commit()

        return {"message": f"Debtor {requested_debtor.name} updated successfully",
         "data": {"name": requested_debtor.name, "amount": requested_debtor.amount}}, 200

    def delete_debtor(self, name):
        """
        Delete a debtor from the system, but only if their balance is settled.

        Args:
            name (str): The name of the debtor to be deleted.

        Returns:
            dict: A response indicating success or failure of the delete operation.
            int: HTTP status code indicating the result of the operation.
        """
        requested_debtor = Debtor.query.filter_by(name=name).first()
        if not requested_debtor:
            return {"message": "Debtor not found!"}, 404

        # check if debtor balance is settled
        if requested_debtor.amount:
            return {"message": f"Unable to delete debtor {name.capitalize()} with outstanding balance of R{requested_debtor.amount}. The balance amount should be zero (R0) to remove the account."}, 422

        # and remove debtor
        db.session.delete(requested_debtor)
        db.session.commit()

        # generate and return appropriate response
        return {"message": f"Debtor '{name}' removed successfully."}, 200


    def response_builder(self, kind, code):
        # avoid dry by implementing a response factory
        pass
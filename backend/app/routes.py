from flask import Blueprint, request, jsonify
from .services import DebtorsManagementService

# define the blueprint for routes
endpoints = Blueprint('api', __name__)

debtors_service = DebtorsManagementService()

# route to get all debtors
@endpoints.route('/view', methods=['GET'])
def view_all_debtors():
    response, status_code = debtors_service.view_all_debtors()
    return jsonify(response), status_code

# route to get specified debtor
@endpoints.route('/view/<name>', methods=['GET'])
def view_debtor(name):
    debtor_name = name.replace('%20', ' ')
    response, status_code = debtors_service.view_debtor(debtor_name)
    return jsonify(response), status_code

# route to update specified debtor amount from json request body
@endpoints.route('/update', methods=['PUT'])
def update_debtor():
    new_data = request.json
    name = new_data.get('name')
    new_amount = new_data.get('amount')

    if not name or not new_amount:
        return {"error": "Both 'name' and 'amount' are required."}, 400

    response, status_code = debtors_service.update_debtor(name, new_amount)
    return jsonify(response), status_code

#  route to delete a specified debtor
@endpoints.route('/delete/<name>', methods=['DELETE'])
def delete_debtor(name):
    response, status_code = debtors_service.delete_debtor(name)
    return jsonify(response), status_code

# route to add a new debtor
@endpoints.route('/add', methods=['POST'])
def add_debtor():
    debtor = request.json
    name = debtor.get('name')
    amount = debtor.get('amount')

    response, status_code = debtors_service.add_debtor(name, int(amount))
    return jsonify(response), status_code
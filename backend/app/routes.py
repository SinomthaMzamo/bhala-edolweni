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
    debtor = request.json
    name = debtor.get('name')
    amount = debtor.get('amount')
    operation = debtor.get('operation')

    if not name or not isinstance(amount, (int, float)) or not operation:
        return {"error": "All the fields 'name', 'operation' and 'amount' are required."}, 400

    response, status_code = debtors_service.update_debtor(name, amount, operation)
    # print(response)
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
    name = debtor.get('name', '')
    amount = debtor.get('amount', None)

    if not name and amount is None:
        return jsonify({'error': 'Debtor amount is required. And Debtor name is required.'}), 400

    if not name and not isinstance(amount, (float, int)):
        return jsonify({'error': 'Debtor amount should be a number. And Debtor name is required.'}), 400

    if not name:
        return jsonify({'error': 'Debtor name is required.'}), 400

    if amount is None:
        return jsonify({'error': 'Debtor amount is required.'}), 400

    if not isinstance(amount, (int, float)):
        return jsonify({'error': 'Debtor amount should be a number.'}), 400

    response, status_code = debtors_service.add_debtor(name, int(amount))
    return jsonify(response), status_code

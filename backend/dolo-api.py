# here the '/add', '/edit', '/close' endpoints are defined

from flask import Flask, request, jsonify
from flask_cors import CORS

from DoloService import DebtorsManagementService as DMS

app = Flask(__name__)
CORS(app)

debtors_service = DMS()

# define api routes

# route to get all debtors
@app.route('/view', methods=['GET'])
def view_all_debtors():
    response, status_code = debtors_service.view_all_debtors()
    return jsonify(response), status_code

# route to get specified debtor
@app.route('/view/<name>', methods=['GET'])
def view_debtor(name):
    debtor_name = name.replace('%20', ' ')
    response, status_code = debtors_service.view_debtor(debtor_name)
    return jsonify(response), status_code

# route to add a new debtor
@app.route('/add', methods=['POST'])
def add_debtor():
    debtor = request.json
    name = debtor.get('name')
    amount = debtor.get('amount')

    response, status_code = debtors_service.add_debtor(name, amount)
    return jsonify(response), status_code 









# Running the app
if __name__ == '__main__':
    app.run(debug=False)
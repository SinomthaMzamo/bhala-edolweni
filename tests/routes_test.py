import unittest
from flask import Flask
from unittest.mock import MagicMock, patch
from backend.app.routes import endpoints
from backend.app import database as db


class TestAPIRoutes(unittest.TestCase):

    def setUp(self):
        #initialise Flask app and the test client
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # Use in-memory database
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db.init_app(self.app)  # Initialize the db with the app

        # set up the database
        with self.app.app_context():
            db.create_all()

        self.app.register_blueprint(endpoints, url_prefix='/api')
        self.client = self.app.test_client()

    def tearDown(self):
        """Clean up the database after each test method"""
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def post_and_check(self, url, data, expected_status, expected_response):
        """Helper method to make POST requests and check responses."""
        response = self.client.post(url, json=data)
        actual_response = response.json
        self.assertEqual(expected_status, response.status_code)
        self.assertEqual(expected_response, actual_response)

    def test_add_debtor_success(self):
        test_data = {
            'name': 'debtor1',
            'amount': 12
        }
        successful_response = {
            "message": f"Debtor '{test_data['name']}' added successfully.",
            "data": {
                "name": test_data['name'],
                "amount": test_data['amount']
            }
        }
        self.post_and_check('/api/add', test_data, 201, successful_response)

    def test_add_invalid_debtor_data(self):
        test_cases = [
            # Missing amount
            ({
                 'name': 'debtor1'
             }, {
                 "error": "Debtor amount is required.",
             }, 400),

            # Invalid amount (string instead of number)
            ({
                 'amount': '12f',
                 'name': 'debtor1'
             }, {
                 "error": "Debtor amount should be a number.",
             }, 400),

            # Missing name
            ({
                 'amount': 12
             }, {
                 "error": "Debtor name is required.",
             }, 400),

            # Invalid number, no name
            ({
                 'amount': "12f"
             }, {
                 "error": "Debtor amount should be a number. And Debtor name is required.",
             }, 400),
        ]

        for test_data, expected_response, expected_status in test_cases:
            with self.subTest(test_data=test_data):
                self.post_and_check('/api/add', test_data, expected_status, expected_response)

    def test_view_all_debtors(self):
        # Assuming there is a method to view all debtors
        test_data = [
            {"name": "debtor1", "amount": 10},
            {"name": "debtor2", "amount": 20},
        ]
        # Populate database or mock data if necessary
        for test_entry in test_data:
            self.post_and_check('/api/add', test_entry, 201, {
                'message': f"Debtor '{test_entry['name']}' added successfully.",
                'data': test_entry
                                                             })

        # Expected response (assuming format is returned as a list)
        expected_response = {'data': test_data,
                             'message': f'Debtor data retrieved successfully ({len(test_data)}).'}

        response = self.client.get('/api/view')
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.json)

    def test_view_debtor(self):
        test_data = {"name": "debtor1", "amount": 10}
        # Simulate adding debtor first
        self.client.post('/api/add', json=test_data)

        expected_response = {'data': test_data, 'message': f"Debtor '{test_data["name"]}' information retrieved successfully."}

        response = self.client.get('/api/view/debtor1')
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.json)

    def test_update_debtor(self):
        test_data = {"name": "debtor1", "amount": 10}
        # Simulate adding debtor first
        self.client.post('/api/add', json=test_data)

        # todo: this should fail!
        updated_data = {"name": "debtor1", "amount": 15, "operation": "add"}
        successful_response = {'data': {'amount': 25, 'name': 'debtor1'}, "message": "Debtor debtor1 updated successfully."}

        response = self.client.put('/api/update', json=updated_data)
        self.assertEqual(200, response.status_code)
        self.assertEqual(successful_response, response.json)

    def test_delete_debtor(self):
        test_data = {"name": "debtor1", "amount": 0}
        # Simulate adding debtor first
        self.client.post('/api/add', json=test_data)

        successful_response = {"message": "Debtor 'debtor1' removed successfully."}

        response = self.client.delete('/api/delete/debtor1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(successful_response, response.json)
if __name__ == '__main__':
    unittest.main()

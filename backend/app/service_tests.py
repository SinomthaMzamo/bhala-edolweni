import unittest
from . import create_app, database
from .data_models import Debtor
from .services import DebtorsManagementService as DMS

class DoloServiceTest(unittest.TestCase):


    @classmethod
    def setUpClass(cls):
        """Create a test app and a test database connection before running test suite"""
        cls.app = create_app()
        cls.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory'
        cls.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        cls.client = cls.app.test_client()
        cls.service = DMS()

    def setUp(self):
        """Set up test database before each test method."""
        with self.app.app_context():
            database.create_all()
            debtor = Debtor(name='test debtor', amount=21)
            database.session.add(debtor)
            database.session.commit()

    def tearDown(self):
        """Clean up the database after each test method"""
        with self.app.app_context():
            database.session.remove()
            database.drop_all()

    def test_add_debtor_success(self):
        with self.app.app_context():
            response, status_code = self.service.add_debtor("new debtor1", 13)
        self.assertEqual(status_code, 201)
        self.assertIn("Debtor 'new debtor1' added successfully", response["message"])

        # check if debtor is in database
        with self.app.app_context():
            debtor = Debtor.query.filter_by(name="new debtor1").first()
            self.assertIsNotNone(debtor)
            self.assertEqual(debtor.amount, 13)

    def test_add_debtor_exists(self):
        with self.app.app_context():
            response, status_code = self.service.add_debtor("test debtor", 12)
        self.assertEqual(status_code, 400)
        self.assertIn("A Debtor by that name already exists", response["error"])

    def test_view_debtor_success(self):
        with self.app.app_context():
            response, status_code = self.service.view_debtor("test debtor")
        self.assertEqual(status_code, 201)
        self.assertIn("Debtor 'test debtor' information retrieved successfully", response["message"])
        self.assertEqual(response["data"]["amount"], 21)

    def test_view_debtor_not_found(self):
        with self.app.app_context():
            response, status_code = self.service.view_debtor("nonexistent debtor")
        self.assertEqual(status_code, 404)
        self.assertIn("Debtor 'nonexistent debtor' not found.", response["error"])

    def test_view_all_debtors_found(self):
        with self.app.app_context():
            response, status_code = self.service.view_all_debtors()
        self.assertEqual(status_code, 201)
        self.assertEqual(len(response["data"]), 1)
        self.assertEqual(response["data"][0]["name"], "test debtor")

    def test_view_all_debtors_empty(self):
        with self.app.app_context():
            database.drop_all()
            database.create_all()
        with self.app.app_context():
            response, status_code = self.service.view_all_debtors()
        self.assertEqual(status_code, 200)
        self.assertIn("No debtors exist, add a debtor first.", response["message"])

    def test_update_debtor_success(self):
        with self.app.app_context():
            response, status_code = self.service.update_debtor("test debtor", 50, "set")
        self.assertEqual(status_code, 201)
        self.assertIn("Debtor test debtor updated successfully", response["message"])
        self.assertEqual(response["data"]["amount"], 50)

    def test_update_debtor_not_found(self):
        with self.app.app_context():
            response, status_code = self.service.update_debtor("nonexistent debtor", 50, "set")
        self.assertEqual(status_code, 404)
        self.assertIn("Debtor not found!", response["message"])

    def test_delete_debtor_success(self):
        with self.app.app_context():
            self.service.update_debtor("test debtor", 0, "set")
            response, status_code = self.service.delete_debtor("test debtor")
        self.assertEqual(status_code, 200)
        self.assertIn("Debtor 'test debtor' removed successfully.", response["message"])

    def test_delete_debtor_with_balance(self):
        with self.app.app_context():
            response, status_code = self.service.delete_debtor("test debtor")
        self.assertEqual(status_code, 422)
        self.assertIn("Unable to delete debtor", response["error"])

    def test_delete_debtor_not_found(self):
        with self.app.app_context():
            response, status_code = self.service.delete_debtor("nonexistent debtor")
        self.assertEqual(status_code, 404)
        self.assertIn("Debtor not found!", response["message"])


if __name__ == "__main__":
    unittest.main()
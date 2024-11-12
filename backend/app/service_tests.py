import unittest
from DoloService import DebtorsManagementService as DMS

class DoloServiceTest(unittest.TestCase):
    def test_adding_a_debtor_should_populate_debtors(self):
        dms = DMS()
        dms.add_debtor("khwezi", "8")
        self.assertEqual({"name":"khwezi", "amount": "8"}, dms.debtors[0])

    def test_editing_a_debtors_name_should_update_debtors(self):
        dms = DMS()
        dms.add_debtor("khwezi", "8")
        dms.edit_debtor_name("khwezi", "luyanda")
        self.assertEqual({"name":"luyanda", "amount": "8"}, dms.debtors[0])

    def test_reducing_a_debtors_balance_should_update_debtors(self):
        dms = DMS()
        dms.add_debtor("khwezi", "8")
        dms.reduce_debtor_debt("khwezi", 4)
        self.assertEqual({"name":"khwezi", "amount": "4"}, dms.debtors[0])

    def test_increasing_a_debtors_balance_should_update_debtors(self):
        dms = DMS()
        dms.add_debtor("khwezi", "8")
        dms.increase_debtor_debt("khwezi", 4)
        self.assertEqual({"name":"khwezi", "amount": "12"}, dms.debtors[0])

    def test_deleting_a_debtor_should_remove_it_from_debtors(self):
        dms = DMS()
        dms.add_debtor("khwezi", "8")
        dms.remove_debtor("khwezi")
        self.assertEqual([], dms.debtors)
        self.assertEqual({"name":"khwezi", "amount": "8"}, dms.backup_data[0])

if __name__ == "__main__":
    unittest.main()
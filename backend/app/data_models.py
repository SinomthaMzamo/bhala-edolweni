from . import database as db

class Debtor(db.Model):
    '''
    Define table "edolweni" schema
    '''
    __tablename__ = 'edolweni'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
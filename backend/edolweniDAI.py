from flask import Flask
from flask_sqlalchemy import SQLAlchemy

#  configure the database server and establish a connection to the database
database_server = Flask(__name__)
database_server.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///edolweni.db'
db = SQLAlchemy(database_server)

class Debtor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

database = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # condigure the app's database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///edolweni.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    database.init_app(app)              #initialise app with extensions, eg. a SQLite database

    # import defined endpoints
    from .routes import endpoints
    app.register_blueprint(endpoints)

    # create the database tables
    with app.app_context():
        database.create_all()

    return app
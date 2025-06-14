from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL",
        "postgresql://user:password@localhost:5432/postgres"
    )
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "fallback-key")

    db.init_app(app)

    from .views import views
    from .auth_routes import auth
    from .rooms import rooms
    app.register_blueprint(views)
    app.register_blueprint(auth)
    app.register_blueprint(rooms)

    return app
from backend.models import Users
from backend.main import app
from backend import db

with app.app_context():
    db.session.query(Users).delete()
    db.session.commit()
    print("all users deleted.")
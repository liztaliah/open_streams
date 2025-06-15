from backend.models import Users, Rooms
from backend.main import app
from backend import db

with app.app_context():
    db.session.query(Rooms).delete()
    db.session.commit()
    print("all rooms deleted")
    db.session.query(Users).delete()
    db.session.commit()
    print("all users deleted.")
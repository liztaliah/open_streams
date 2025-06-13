from backend import db
from backend.main import app

with app.app_context():
    db.create_all()
    print('database initialized')
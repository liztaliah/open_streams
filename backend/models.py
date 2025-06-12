from . import db
from sqlalchemy.sql import func

# Class for host users that can access the media database
# We will change this later when we create the class for viewers
class Users(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    creation_time = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f'<User {self.username} {self.id}, created at {self.creation_time}>'

# Class for video media
class Videos(db.Model):
    __tablename__ = "Videos"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    filename = db.Column(db.String(255), nullable=False)
    upload_time = db.Column(db.DateTime(timezone=True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)

    user = db.relationship('Users', backref=db.backref('videos', lazy=True))

    def __repr__(self):
        return f'<Video {self.title} by User {self.user_id}, uploaded at {self.upload_time}>'
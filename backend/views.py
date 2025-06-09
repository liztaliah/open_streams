from flask import Blueprint, jsonify
from .models import Users

views = Blueprint('views', __name__, url_prefix='/api')

@views.route("/users", methods=["GET"])
def get_user_manifest():
    users = Users.query.all()
    user_list = [
        {
            "username": user.username,
            "creation_time": user.creation_time.isoformat()
        }
        for user in users
    ]
    return jsonify(user_list)
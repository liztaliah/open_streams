from flask import Blueprint, jsonify, send_from_directory, current_app
from .models import Users
from .auth_routes import token_required
import os

views = Blueprint("views", __name__, url_prefix="/api")


@views.route("/users", methods=["GET"])
def get_user_manifest():
    users = Users.query.all()
    user_list = [
        {"username": user.username, "creation_time": user.creation_time.isoformat()}
        for user in users
    ]
    return jsonify(user_list)


# Route for simple video player
@views.route("video", methods=["GET"])
@token_required
def serve_video(current_user):
    video_folder = os.path.join(current_app.root_path, "assets")
    video_filename = "sample.mkv"
    return send_from_directory(video_folder, video_filename, as_attachment=False)

from flask import Blueprint, request, jsonify
from .models import db, Rooms
from .auth_routes import token_required

rooms = Blueprint("rooms", __name__, url_prefix="/api/rooms")


# Route to create room
@rooms.route("/", methods=["POST"])
@token_required
def create_room(current_user):
    data = request.get_json()
    name = data.get("name")
    if not name:
        return jsonify({"error": "Room name is required"}), 400
    if Rooms.query.filter_by(name=name).first():
        return jsonify({"error": "Room name already exists"}), 400
    room = Rooms(name=name, host_id=current_user.id)
    db.session.add(room)
    db.session.commit()
    return (
        jsonify(
            {
                "id": room.id,
                "name": room.name,
                "host_id": room.host_id,
                "created_at": room.created_at.isoformat(),
            }
        ),
        201,
    )


# Route to list rooms
@rooms.route("/", methods=["GET"])
@token_required
def list_rooms(current_user):
    rooms = Rooms.query.all()
    return jsonify(
        [
            {
                "id": r.id,
                "name": r.name,
                "host_id": r.host_id,
                "created_at": r.created_at.isoformat(),
            }
            for r in rooms
        ]
    )


# Route to get specific room info
@rooms.route("/<int:room_id>", methods=["GET"])
@token_required
def get_room(current_user, room_id):
    room = Rooms.query.get_or_404(room_id)
    return jsonify(
        {
            "id": room.id,
            "name": room.name,
            "host_id": room.host_id,
            "created_at": room.created_at.isoformat(),
        }
    )

from flask_socketio import emit, join_room, leave_room
from . import socketio


@socketio.on("join")
def handle_join(data):
    room = data["room"]
    join_room(room)
    emit(
        "message",
        {"user": "system", "text": f"{data['user']} joined the room."},
        room=room,
    )


@socketio.on("leave")
def handle_leave(data):
    room = data["room"]
    leave_room(room)
    emit(
        "message",
        {"user": "system", "text": f"{data['user']} left the room."},
        room=room,
    )


@socketio.on("chat")
def handle_chat(data):
    room = data["room"]
    emit("message", {"user": data["user"], "text": data["text"]}, room=room)

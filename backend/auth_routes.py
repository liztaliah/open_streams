import jwt
import datetime
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from .models import Users
from . import db

# Blueprint for all authentication routes
auth = Blueprint("auth", __name__, url_prefix="/api")

# Signup route
@auth.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    # Validate user input
    if not username or not password:
        return jsonify({"error": "missing fields"}), 400
    
    # Check if user exists
    existing_user = Users.query.filter_by(username = username).first()
    if existing_user:
        return jsonify({"error": "user already exists"}), 409

    # Hash password and create user
    hashed_password = generate_password_hash(password)

    # Successful user add to database
    user = Users(username=username, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# Login route
@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    # Validate user input
    if not username or not password:
        return jsonify({"error": "missing fields"}), 400
    
    # Check if user exists
    user = Users.query.filter_by(username = username).first()
    if not user:
        return jsonify({"error": "Invalid username or password"}), 401 
    
    # Check password hash
    if not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401 
    
    # Create JWT token
    token = jwt.encode({
        "user_id": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }, current_app.config["SECRET_KEY"], algorithm="HS256")

    # Return token
    return jsonify({
        "message": "Login successful!",
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username
        }
    }), 200
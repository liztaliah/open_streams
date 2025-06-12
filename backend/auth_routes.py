import jwt
import datetime
from flask import Blueprint, request, jsonify, current_app, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from .models import Users
from . import db

# Function for checking for auth token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Gets token from cookies
        token = request.cookies.get("token")

        # Return error if no token
        if not token:
            return jsonify({"error": "Token is missing!"}), 401

        # Decode JWT and find the user in the database
        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = Users.query.filter_by(id=data['user_id']).first()
            if not current_user:
                return jsonify({"error": "User not found!"}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 401
        
        # Return the wrapped function passing the current user
        return f(current_user, *args, **kwargs)
    return decorated

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

    # Save the jwt token as a cookie in the browser
    response = make_response(jsonify({"message": "Login successfull"}))
    response.set_cookie(
        "token", token,
        httponly=True,
        secure=True,
        samesite="Strict"
    )
    return response
    
@auth.route("/check-auth", methods=["GET"])
@token_required
def check_auth(current_user):
    return jsonify({"message": "Authenticated"}), 200
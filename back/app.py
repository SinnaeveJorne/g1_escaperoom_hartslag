from flask import Flask, jsonify, request
import pymysql
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from datetime import timedelta
from passlib.context import CryptContext
from flask_jwt_extended import get_jwt_identity
from flask_cors import CORS
from repositories.DataRepository import DataRepository


# Flask app instance
app = Flask(__name__)
CORS(app)


ENDPOINT = '/api/v1'

# Secret key for JWT
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@127.0.0.1:3306/beatscape'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to create database if not exists
#--------------------------------------------------------------
# # Model definition
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     firstname = db.Column(db.String(100), nullable=False)
#     lastname = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     hashed_password = db.Column(db.String(255), nullable=False)

# # Function to create database if not exists
# def create_database_if_not_exists():
#     connection = pymysql.connect(
#         host='127.0.0.1',
#         user='root',
#         password='root'
#     )
#     cursor = connection.cursor()
#     cursor.execute("CREATE DATABASE IF NOT EXISTS beatscape")
#     cursor.close()
#     connection.close()

# # Initialize the app
# with app.app_context():
#     create_database_if_not_exists()  # Create the database
#     db.create_all()  # Create the tables

# @app.route('/')
# def home():
#     return "Database and tables are ready!"
#--------------------------------------------------------------

@app.route(ENDPOINT + '/register/', methods=['POST'])
def register_user():
    if request.method == 'POST':
        gegevens = DataRepository.json_or_formdata(request)
        
        # Access plain password, not hashed_password
        firstname = gegevens['firstname']
        lastname = gegevens['lastname']
        email = gegevens['email']
        password = gegevens['password']
        
        # Hash the password before saving it
        hashed_password = pwd_context.hash(password)

        # Validate the input
        if not firstname or not lastname or not email or not password:
            return jsonify({"message": "Missing parameters"}), 400
        
       # Use DataRepository to check if the user already exists
        user_exists = DataRepository.get_user_by_email(email)  # This should return user data if found, else None
        if user_exists:
            return jsonify({"message": "User already exists"}), 400
        
        
        # Call DataRepository to create a new user with hashed password
        DataRepository.create_register(firstname, lastname, email, hashed_password)
        return jsonify({"message": "User created successfully"}), 201


@app.route(ENDPOINT + '/login/', methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    # Fetch user details using DataRepository
    user = DataRepository.get_user_by_email(email)
    # 1. Check if the user exists and the password is valid
    if not user or not pwd_context.verify(password, user['hashed_password']):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user['id']))  # Create JWT token
    return jsonify(access_token=access_token)


@app.route(ENDPOINT +'/profile/', methods=['GET'])
@jwt_required()
def profile():
    # Retrieve the user ID from the JWT token's 'sub' claim
    current_user_id = get_jwt_identity()  # This returns the 'sub' claim (user's ID)
    # Query the user by their ID
    user = DataRepository.get_user_by_id(current_user_id)

    if user:
        return jsonify({
            "id": user['id'],
            "firstname": user['firstname'],
            "lastname": user['lastname'],
            "email": user['email']
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404


# Main route to test if the app is running
@app.route('/', methods=['GET'])
def home():
    return jsonify(message="Welcome to the Flask App")

if __name__ == '__main__':
    app.run(debug=True)

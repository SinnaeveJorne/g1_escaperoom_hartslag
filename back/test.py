from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
from passlib.context import CryptContext
from flask_jwt_extended import get_jwt_identity
from configparser import ConfigParser
from datetime import timedelta
from repositories.DataRepository import DataRepository

# Flask app instance
app = Flask(__name__)
CORS(app)

ENDPOINT = '/api/v1'

# Secret key for JWT
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)

# Configuratie lezen uit config.py
config = ConfigParser()
config.read('config.py')

user = config['connector_python']['user']
password = config['connector_python']['password']
host = config['connector_python']['host']
port = config['connector_python']['port']
database = config['connector_python']['database']

# Database configuratie instellen
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.route(ENDPOINT + '/register/', methods=['POST'])
def register_user():
    if request.method == 'POST':
        gegevens = DataRepository.json_or_formdata(request)
        
        firstname = gegevens['firstname']
        lastname = gegevens['lastname']
        email = gegevens['email']
        password = gegevens['password']
        
        hashed_password = pwd_context.hash(password)

        if not firstname or not lastname or not email or not password:
            return jsonify({"message": "Missing parameters"}), 400
        
        user_exists = DataRepository.get_user_by_email(email)
        if user_exists:
            return jsonify({"message": "User already exists"}), 400
        
        DataRepository.create_register(firstname, lastname, email, hashed_password)
        return jsonify({"message": "User created successfully"}), 201

@app.route(ENDPOINT + '/login/', methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    user = DataRepository.get_user_by_email(email)
    if not user or not pwd_context.verify(password, user['hashed_password']):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user['id']))
    return jsonify(access_token=access_token)

@app.route(ENDPOINT +'/profile/', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
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

@app.route('/', methods=['GET'])
def home():
    return jsonify(message="Welcome to the Flask App")

if __name__ == '__main__':
    app.run(debug=True)

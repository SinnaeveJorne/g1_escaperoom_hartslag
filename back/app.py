
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from configparser import ConfigParser
from repositories.DataRepository import DataRepository
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi import Depends, HTTPException, status
import secrets
from typing import Optional
import logging


# FastAPI app instance
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 2

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:root@127.0.0.1:3306/beatscape"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # Configuratie lezen uit config.py
# config = ConfigParser()
# config.read('config.py')

# user = config['connector_python']['user']
# password = config['connector_python']['password']
# host = config['connector_python']['host']
# port = config['connector_python']['port']
# database = config['connector_python']['database']

# # Database configuratie instellen
# app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Helper functions
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire.timestamp()})  # Convert to UNIX timestamp
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Models for request/response bodies
class UserRegister(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Feedback(BaseModel):
    user_id: int
    room_id: int
    feedback: str
    rating: int

class RoomCreate(BaseModel):
    host_user_id: int
    is_public: bool

class JoinRoom(BaseModel):
    room_code: str
    user_id: int

class DeleteRoom(BaseModel):
    room_id: int
    host_user_id: int

class RemovePlayer(BaseModel):
    user_id: int
    host_user_id: int

# Define a Pydantic model for the request body
class LeaderboardUpdate(BaseModel):
    user_id: int
    completion_time: float
    game_type: str

# get all users
@app.get("/api/v1/users/")
def get_all_users():
    return DataRepository.get_all_users()

# Routes
@app.post("/api/v1/register/")
def register_user(user: UserRegister):
    if DataRepository.get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="User already exists")
    
    #validate the input 
    if not user.firstname or not user.lastname or not user.email or not user.password:
        raise HTTPException(status_code=400, detail="All fields are required")

    hashed_password = get_password_hash(user.password)
    DataRepository.create_register(user.firstname, user.lastname, user.email, hashed_password)
    return {"message": "User created successfully"}

@app.post("/api/v1/login/")
def login_user(user: UserLogin):
    db_user = DataRepository.get_user_by_email(user.email)
    if not db_user or not verify_password(user.password, db_user['hashed_password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(db_user['id'])})
    return {"access_token": access_token}

#make a route to update a user profile
@app.put("/api/v1/profile/")
def update_user_profile(id: int, email: Optional[str] = None, firstname: Optional[str] = None, lastname: Optional[str] = None, password: Optional[str] = None):
    if not DataRepository.get_user_by_id(id):
        raise HTTPException(status_code=404, detail="User not found")
    #get current data 
    current_user = DataRepository.get_user_by_id(id)
    #check if all the fields are filled if not fill in with the current data 
    if not email:
        email = current_user['email']
    if not firstname:   
        firstname = current_user['firstname']
    if not lastname:
        lastname = current_user['lastname']
    if not password:
        password = current_user['hashed_password']
    else:
        password = get_password_hash(password)
    
    DataRepository.update_user_profile(id, firstname,lastname, email, password)


    return {"message": "User profile updated successfully"}

@app.get("/get_token/{user_id}/")
def generate_user_access_token_without_login(user_id: int):
    user = DataRepository.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    access_token = create_access_token(data={"sub": str(user['id'])})
    return {"access_token": access_token}

@app.get("/api/v1/profile/")
def get_profile(current_user_id: int):
    user = DataRepository.get_user_by_id(current_user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user['id'],
        "firstname": user['firstname'],
        "lastname": user['lastname'],
        "email": user['email']
    }
#get all rooms
@app.get("/api/v1/rooms/")
def get_rooms():
    return DataRepository.get_rooms()


@app.post("/api/v1/room/")
def create_room(room: RoomCreate):
    # Validate host_user_id exists
    host_user = DataRepository.get_user_by_id(room.host_user_id)
    if not host_user:
        raise HTTPException(status_code=404, detail="Host user not found")

    # Check if the host already has an active room
    if DataRepository.get_active_room_by_host(room.host_user_id):
        raise HTTPException(status_code=400, detail="Host already has an active room")

    # Generate a unique room code
    room_code = secrets.token_hex(3).upper()

    # Create the room
    try:
        room_id = DataRepository.create_room(room_code, room.host_user_id, room.is_public)
        if not room_id:
            raise HTTPException(status_code=500, detail="Failed to create room")

        # Add host to the room
        DataRepository.add_player_to_room(room_id, room.host_user_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating room: {str(e)}")

    return {"message": "Room created successfully", "room_code": room_code}

#get all players of a room 
@app.get("/api/v1/room/{room_id}/players/")
def get_room_players(room_id: int):
    players = DataRepository.get_players_in_room(room_id)
    if not players:
        raise HTTPException(status_code=404, detail="No players found in this room")
    
    #if room doesnt exist 
    room = DataRepository.get_room_by_id(room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    return players

#get amount of players in a room
@app.get("/api/v1/room/{room_id}/player_count/")
def get_amount_players_in_room(room_id: int):
    player_count = DataRepository.get_amount_of_players_in_room(room_id)
    return {"player_count": player_count}

@app.post("/api/v1/room/join/")
def join_room(join_data: JoinRoom):
    # Validate if the room exists
    room = DataRepository.get_room_by_code(join_data.room_code)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    # Validate if the user exists
    user = DataRepository.get_user_by_id(join_data.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if room is full
    if DataRepository.get_room_player_count(room['id']) >= 8:
        raise HTTPException(status_code=400, detail="Room is full")

    # Check if the user is already in the room
    if DataRepository.get_player_in_room(room['id'], join_data.user_id):
        raise HTTPException(status_code=400, detail="User is already in the room")

    # Add the user to the room
    DataRepository.add_player_to_room(room['id'], join_data.user_id)

    return {"message": "Successfully joined the room!"}



@app.delete("/api/v1/room/delete/")
def delete_room(delete_data: DeleteRoom):
    room = DataRepository.get_room_by_id(delete_data.room_id)
    if not room or room['host_user_id'] != delete_data.host_user_id:
        raise HTTPException(status_code=403, detail="Only the host can delete the room")

    DataRepository.delete_room_with_teammates(delete_data.room_id)
    return {"message": "Room and all its teammates have been deleted successfully"}





# @app.delete("/api/v1/room/{room_id}/leave/")
# def leave_room(room_id: int, user_id: int):
#     if not DataRepository.get_player_in_room(room_id, user_id):
#         raise HTTPException(status_code=404, detail="Player not found in this room")

#     DataRepository.delete_player_from_room(room_id, user_id)
#     return {"message": "Player has left the room successfully"}

@app.delete("/api/v1/room/{room_id}/leave/")
def leave_room(room_id: int, user_id: int):
    if not DataRepository.get_player_in_room(room_id, user_id):
        raise HTTPException(status_code=404, detail="Player not found in this room")

    room = DataRepository.get_room_by_id(room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    if room['host_user_id'] == user_id:
        players = DataRepository.get_players_in_room(room_id)
        print(players)  # Debugging: Log the players' structure

        # Adjust to use 'id' instead of 'user_id'
        players = [p for p in players if p['id'] != user_id]

        if players:
            new_host_id = players[0]['id']
            DataRepository.update_room_host(room_id, new_host_id)
        else:
            DataRepository.delete_room_with_teammates(room_id)
            return {"message": "Room deleted as no players were left"}

    DataRepository.delete_player_from_room(room_id, user_id)
    return {"message": "Player has left the room successfully"}



@app.delete("/api/v1/room/{room_id}/kick_player/")
def remove_player_from_room(room_id: int, data: RemovePlayer):
    room = DataRepository.get_room_by_id(room_id)
    if not room or room['host_user_id'] != data.host_user_id:
        raise HTTPException(status_code=403, detail="Only the host can remove players from the room")

    if not DataRepository.get_player_in_room(room_id, data.user_id):
        raise HTTPException(status_code=404, detail="Player not found in this room")

    DataRepository.delete_player_from_room(room_id, data.user_id)
    return {"message": "Player has been removed from the room successfully"}

@app.post("/api/v1/game/feedback/")
def post_feedback(feedback: Feedback):
    DataRepository.post_feedback(feedback.user_id, feedback.room_id, feedback.feedback, feedback.rating)
    return {"message": "Feedback posted successfully"}


def verify_api_access():
    # Add your authentication logic here (e.g., token check)
    # Example: check for a hardcoded token
    token = "my_secure_token"
    if token != "my_secure_token":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access forbidden")
    
@app.get("/api/v1/game/leaderboard/{user_id}")
def get_leaderboard(user_id: int, game_type: str):
    try:
        return DataRepository.get_player_best_time(user_id, game_type)
    except Exception as e:
        logging.error(f"Error getting leaderboard for user {user_id}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@app.post("/api/v1/game/leaderboard/")
def update_global_leaderboard(update: LeaderboardUpdate):
    try:
        user_id = update.user_id
        completion_time = update.completion_time
        game_type = update.game_type

        # Check if the user already has a record in the global leaderboard for the given game type
        best_time_record = DataRepository.get_player_best_time(user_id, game_type)

        # If the user has no record yet, insert a new record
        if not best_time_record:
            DataRepository.add_leaderboard(user_id, completion_time, game_type)
            return {"message": "User added to the leaderboard successfully"}
        # If the user has a record and the new time is better, update the record
        elif completion_time < best_time_record['best_time']:
            DataRepository.update_leaderboard(user_id, completion_time, game_type)
            return {"message": "Leaderboard updated successfully"}
    except Exception as e:
        logging.error(f"Error updating leaderboard for user {user_id}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")


# # Custom Swagger UI route
# @app.get("/docs", include_in_schema=False)
# def custom_swagger_ui_html(current_user: str = Depends(verify_api_access)):
#     return get_swagger_ui_html(openapi_url="/openapi.json", title="API Documentation")

# @app.get("/api/v1/statistics/exercises/")
# def get_statistics():
#     return DataRepository.get_statistics()

# @app.get("/api/v1/leaderboard/{room_id}")
# def get_leaderboard(room_id: int):
#     return DataRepository.get_leaderboard(room_id)

# @app.get("/api/v1/leaderboard/")
# def get_global_leaderboard():
#     return DataRepository.get_global_leaderboard()

@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI App"}


from .Database import Database



class DataRepository:
    @staticmethod
    def json_or_formdata(request):
        if request.method != 'GET' and request.content_type == 'application/json':
            gegevens = request.get_json()
        else:
            gegevens = request.form.to_dict()
        return gegevens

    @staticmethod
    def create_register(firstname, lastname, email, password):
        sql = "INSERT INTO user (firstname, lastname, email, hashed_password) VALUES (%s, %s, %s, %s)"
        params = [firstname, lastname, email, password]
        return Database.execute_sql(sql, params)
    
    @staticmethod
    def get_user_by_email(email):
        """Fetch user details by email."""
        sql = "SELECT id, firstname, lastname, email, hashed_password FROM user WHERE email = %s"
        params = [email]
        return Database.get_one_row(sql, params) 
    
    @staticmethod
    def get_user_by_id(user_id):
        """Fetch user details by ID including hashed password."""
        sql = "SELECT id, firstname, lastname, email, hashed_password FROM user WHERE id = %s"
        params = [user_id]
        return Database.get_one_row(sql, params)
    
    @staticmethod
    def get_all_users():
        """Fetch all users."""
        sql = "SELECT id, firstname, lastname, email FROM user"
        return Database.get_rows(sql)
    

    # @staticmethod
    # def get_user_by_id(user_id):
    #     """Fetch user details by ID."""
    #     sql = "SELECT id, firstname, lastname, email FROM user WHERE id = %s"
    #     params = [user_id]
    #     return Database.get_one_row(sql, params)  
    


    @staticmethod
    def update_user_profile(id, firstname, lastname, email, password):
        """Update user profile details."""
        sql = "UPDATE user SET firstname = %s, lastname = %s, email = %s, hashed_password = %s WHERE id = %s"
        params = [firstname, lastname, email, password, id]
        return Database.execute_sql(sql, params)
    

    @staticmethod 
    def create_room(room_code, host_user_id, is_public):
        sql = 'INSERT INTO Rooms (room_code, host_user_id, is_public) VALUES (%s, %s, %s)'
        params = [room_code, host_user_id, is_public]
        return Database.execute_sql(sql, params)
    
    
    @staticmethod
    def add_player_to_room(room_id, user_id):
        """Add a user to a room."""
        sql = "INSERT INTO Teams (room_id, user_id) VALUES (%s, %s)"
        params = [room_id, user_id]
        return Database.execute_sql(sql, params)
    
    @staticmethod
    def get_players_in_room(room_id):
        """Get all players in a room."""
        sql = "SELECT u.id, u.firstname, u.lastname, u.email FROM Teams t JOIN `User` u ON t.user_id = u.id WHERE t.room_id = %s"
        params = [room_id]
        return Database.get_rows(sql, params)
    
    @staticmethod
    def get_player_in_room(room_id, user_id):
        """Get a player in a room."""
        sql = "SELECT u.id, u.firstname, u.lastname, u.email FROM Teams t JOIN `User` u ON t.user_id = u.id WHERE t.room_id = %s AND t.user_id = %s"
        params = [room_id, user_id]
        return Database.get_one_row(sql, params)
    
    @staticmethod
    def get_amount_of_players_in_room(room_id):
        """Get the number of players in a room."""
        sql = "SELECT COUNT(*) as player_count FROM Teams WHERE room_id = %s"
        params = [room_id]
        return Database.get_one_row(sql, params)["player_count"]

    @staticmethod
    def get_room_player_count(room_id):
        """Get the number of players in a room."""
        sql = "SELECT COUNT(*) as player_count FROM Teams WHERE room_id = %s"
        params = [room_id]
        return Database.get_one_row(sql, params)["player_count"]
    
    @staticmethod
    def get_room_by_code(room_code):
        """Get room details by room code."""
        sql = "SELECT id, room_code, host_user_id, is_public FROM Rooms WHERE room_code = %s"
        params = [room_code]
        return Database.get_one_row(sql, params)
    
    @staticmethod
    def get_room_by_id(room_id):
        """Get room details by ID."""
        sql = "SELECT * FROM Rooms WHERE id = %s"
        params = [room_id]
        return Database.get_one_row(sql, params)

    
    @staticmethod	
    def get_rooms():
        """Get all rooms."""
        sql = "SELECT id, room_code, host_user_id, is_public FROM Rooms"
        return Database.get_rows(sql)
    
    # @staticmethod
    # def delete_room(room_id):
    #     """Delete a room."""
    #     sql = "DELETE FROM Rooms WHERE id = %s"
    #     params = [room_id]
    #     return Database.execute_sql(sql, params)

    @staticmethod
    def update_room_host(room_id, new_host_user_id):
        sql = "UPDATE Rooms SET host_user_id = %s WHERE id = %s"
        params = [new_host_user_id, room_id]
        return Database.execute_sql(sql, params)

    
    @staticmethod
    def delete_player_from_room(room_id, user_id):
        """Delete a player from a room."""
        sql = "DELETE FROM Teams WHERE room_id = %s AND user_id = %s"
        params = [room_id, user_id]
        return Database.execute_sql(sql, params)
    
    @staticmethod
    def get_active_room_by_host(host_user_id):
        """Check if the host already has an active room."""
        sql = "SELECT id FROM Rooms WHERE host_user_id = %s"
        params = [host_user_id]
        return Database.get_one_row(sql, params)
    
    @staticmethod
    def delete_room_with_teammates(room_id):
        """Delete a room and its teammates."""
        sql_teammates = "DELETE FROM Teams WHERE room_id = %s"
        sql_room = "DELETE FROM Rooms WHERE id = %s"
        params = [room_id]
        Database.execute_sql(sql_teammates, params)  # First, delete all teammates
        return Database.execute_sql(sql_room, params)  # Then, delete the room
    

    @staticmethod
    def post_feedback(user_id, room_id, mood, review):
        sql = "INSERT INTO Feedback (user_id, room_id, mood, review) VALUES (%s, %s, %s, %s)"
        params = [user_id, room_id, mood, review]
        return Database.execute_sql(sql, params)


    @staticmethod
    def get_player_best_time(user_id, game_type):
        # get best time and first last name of user and game_type
        sql = "SELECT gl.best_time, u.firstname, u.lastname FROM GlobalLeaderboard gl JOIN `user` u ON gl.user_id = u.id WHERE gl.user_id = %s AND gl.game_type = %s"
        params = [user_id, game_type]
        return Database.get_one_row(sql, params)
    
    @staticmethod
    def update_leaderboard(user_id, new_best_time,game_type):
        sql =  "UPDATE GlobalLeaderboard SET best_time = %s WHERE user_id = %s  AND game_type = %s"
        params = [new_best_time, user_id, game_type]
        return Database.execute_sql(sql, params)
    
    @staticmethod
    def add_leaderboard(user_id, best_time, game_type):
        sql = "INSERT INTO GlobalLeaderboard (user_id, best_time, game_type) VALUES (%s, %s, %s)"
        params = [user_id, best_time, game_type]
        return Database.execute_sql(sql, params)


    # @staticmethod
    # def update_user_password(user_id, hashed_password):
    #     """Update user password."""
    #     sql = "UPDATE user SET hashed_password = %s WHERE id = %s"
    #     params = [hashed_password, user_id]
    #     return Database.execute_sql(sql, params)


    



 

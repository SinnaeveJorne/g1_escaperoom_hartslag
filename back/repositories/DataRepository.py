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
        """Fetch user details by ID."""
        sql = "SELECT id, firstname, lastname, email FROM user WHERE id = %s"
        params = [user_id]
        return Database.get_one_row(sql, params)  

 

import pymysql
from configparser import ConfigParser

def list_database_tables():
    # Configuratie lezen uit config.py
    config = ConfigParser()
    config.read('config.py')

    try:
        # Database details uit de configuratie halen
        user = config['connector_python']['user']
        password = config['connector_python']['password']
        host = config['connector_python']['host']
        port = int(config['connector_python']['port'])
        database = config['connector_python']['database']

        # Verbinding maken met de database
        connection = pymysql.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            port=port
        )
        print("Succesvol verbonden met de database!")

        # Lijst van tabellen ophalen
        with connection.cursor() as cursor:
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            print("Tabellen in de database:")
            for table in tables:
                print(table[0])

        connection.close()
    except Exception as e:
        print("Kan geen verbinding maken met de database:", str(e))

if __name__ == "__main__":
    list_database_tables()

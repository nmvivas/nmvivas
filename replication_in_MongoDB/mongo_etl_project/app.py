# app.py
from pymongo import MongoClient, errors

# Cadenas de conexión para las bases de datos
SOURCE_MONGODB_URLS = [
    'mongodb://192.168.43.112:60000/',
    'mongodb://192.168.43.112:50001/',
    'mongodb://192.168.43.112:50002/',
    'mongodb://192.168.43.112:50003/'
]

DESTINATION_MONGODB_URLS = [
    'mongodb://192.168.43.112:60001/',
    'mongodb://192.168.43.112:50005/',
    'mongodb://192.168.43.112:50006/',
    'mongodb://192.168.43.112:50007/'
]


def connect_to_mongodb(mongodb_urls):
    for url in mongodb_urls:
        try:
            client = MongoClient(url, serverSelectionTimeoutMS=2000)
            client.server_info()  # Lanza una excepción si no puede conectarse al servidor
            return client
        except errors.ServerSelectionTimeoutError:
            continue  # Prueba con el siguiente URL si no pudo conectarse
    return None  # Devuelve None si no pudo conectarse a ninguno de los servidores


def perform_etl():
    # Conexión a la base de datos origen
    source_client = connect_to_mongodb(SOURCE_MONGODB_URLS)
    if not source_client:
        print("No se encontró conexión con la base de datos origen")
        return

    source_db = source_client['sharddemo']
    source_collection = source_db['myusers']

    # Conexión a la base de datos destino
    destination_client = connect_to_mongodb(DESTINATION_MONGODB_URLS)
    if not destination_client:
        print("No se encontró conexión con la base de datos destino")
        return

    destination_db = destination_client['sharddemo']
    destination_collection = destination_db['myusers']

    # Si ya existe la base de datos en la base de datos destino, borramos la colección 'myusers'
    if 'myusers' in destination_db.list_collection_names():
        destination_collection.drop()

    try:
        # Extracción de datos de la base de datos origen
        data = source_collection.find({})

        # Transformación y carga de datos en la base de datos destino
        for record in data:
            # Eliminar el campo _id
            record.pop('_id', None)
            destination_collection.insert_one(record)

        print('ETL process completed successfully')

    except Exception as err:
        print('An error occurred', str(err))


if __name__ == "__main__":
    perform_etl()

# app.py
from flask import Flask, jsonify
from pymongo import MongoClient, errors

# Cadenas de conexión para las bases de datos
SOURCE_MONGODB_URL = 'mongodb://192.168.43.116:60000/'
DESTINATION_MONGODB_URL = 'mongodb://192.168.43.116:60001/'

# Configuración de Flask
app = Flask(__name__)

@app.route('/etl', methods=['GET'])
def perform_etl():
    try:
        # Conexión a la base de datos origen
        source_client = MongoClient(SOURCE_MONGODB_URL)
        source_db = source_client['sharddemo']
        source_collection = source_db['myusers']

        # Conexión a la base de datos destino
        destination_client = MongoClient(DESTINATION_MONGODB_URL)
        destination_db = destination_client['sharddemo']
        destination_collection = destination_db['myusers']

        # Si ya existe la base de datos en la base de datos destino, borramos la colección 'myusers'
        if 'myusers' in destination_db.list_collection_names():
            destination_collection.drop()

        # Extracción de datos de la base de datos origen
        data = source_collection.find({})

        # Transformación y carga de datos en la base de datos destino
        for record in data:
            # Eliminar el campo _id
            record.pop('_id', None)
            destination_collection.insert_one(record)

        return jsonify({'message': 'ETL process completed successfully'}), 200

    except errors.ServerSelectionTimeoutError as err:
        return jsonify({'message': 'Server not accessible', 'error': str(err)}), 500

    except Exception as err:
        return jsonify({'message': 'An error occurred', 'error': str(err)}), 500


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5500)

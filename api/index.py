from flask import Flask, request, jsonify
from flask_cors import CORS
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.services.storage import Storage
from appwrite.input_file import InputFile
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Appwrite Client
client = Client()
client.set_endpoint(os.getenv("APPWRITE_ENDPOINT"))
client.set_project(os.getenv("APPWRITE_PROJECT_ID"))
client.set_key(os.getenv("APPWRITE_API_KEY"))

# Global Database, Collection, and Bucket IDs
DATABASE_ID = os.getenv("APPWRITE_DATABASE_ID")
COLLECTION_ID = os.getenv("APPWRITE_COLLECTION_ID")
BUCKET_ID = os.getenv("APPWRITE_BUCKET_ID")

databases = Databases(client)
storage = Storage(client)

@app.route("/api/add_document", methods=["POST"])
def add_document():
    data = request.json
    try:
        response = databases.create_document(
            database_id=DATABASE_ID,
            collection_id=COLLECTION_ID,
            document_id=data["document_id"],
            data=data["data"]
        )
        return jsonify({"message": "Document added successfully", "response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/api/list_documents", methods=["GET"])
def list_documents():
    try:
        response = databases.list_documents(DATABASE_ID, COLLECTION_ID)
        return jsonify({"documents": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/api/upload_file", methods=["POST"])
def upload_file():
    file = request.files['file']
    file_path = "./temp_upload_file"
    file.save(file_path)
    
    try:
        file_to_upload = InputFile.from_path(file_path)
        response = storage.create_file(bucket_id=BUCKET_ID, file_id='unique()', file=file_to_upload)
        return jsonify({"message": "File uploaded successfully", "response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/api/list_files", methods=["GET"])
def list_files():
    try:
        files = storage.list_files(bucket_id=BUCKET_ID)
        return jsonify({"files": files}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/api/delete_file", methods=["DELETE"])
def delete_file():
    data = request.json
    try:
        storage.delete_file(bucket_id=BUCKET_ID, file_id=data["file_id"])
        return jsonify({"message": "File deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
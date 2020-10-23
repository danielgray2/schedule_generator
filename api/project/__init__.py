from flask import Flask, jsonify, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)

    def __init__(self, email):
        self.email = email

@app.route("/")
def hello_world():
    return jsonify(hello="world")

@app.route("/another")
def another():
    return jsonify(goodbye="bye")

@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

@app.route('/additem', methods=['POST', 'GET'])
def index():

    if request.method == 'POST':
        task_content = request.get_json()
        return jsonify(my_return_value)
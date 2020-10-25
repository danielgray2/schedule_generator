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

task_info = {}

@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

@app.route('/additem', methods=['POST'])
def index():

    if request.method == 'POST':
        task_content = request.get_json()

        if not task_content["time"] in task_info:
            return_dict = {"added_successfully": "true",
                            "task_received": task_content}
            task_info[task_content["time"]] = task_content
            return jsonify(return_dict)

        return_dict = {"added_successfully": "false",
                        "task_received": {}}
        return jsonify(return_dict)

@app.route("/tasklist")
def get_task_list():
    return jsonify(task_info)
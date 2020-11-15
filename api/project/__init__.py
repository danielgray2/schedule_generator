from flask import Flask, jsonify, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from flask_api import status

app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    tasks = db.relationship("Task")

    def __init__(self, firstname, lastname, email, password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password

class Task(db.Model):
    __tablename__ = "task"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    time = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, name, time, user_id):
        self.name = name
        self.time = time
        self.user_id = user_id

# task_info = {}

@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

@app.route('/additem', methods=['POST'])
def index():

    if request.method == 'POST':
        task_content = request.get_json()

        task = Task(task_content["name"], task_content["time"], task_content["user_id"])

        db.session.add(task)
        db.session.commit()

        has_task = Task.query.filter_by(user_id=task_content["user_id"], time=task_content["time"])
        task_search = has_task[0]

        if task_search["time"] != task_content["time"]:

            return_task_dict = {task_search["name"], task_search["time"], task_search["user_id"]}

            return jsonify(return_task_dict)

        if task_search["time"] == task_content["time"]:
            
            return_task_dict = {}

            return jsonify(return_task_dict), status.HTTP_404_NOT_FOUND





        # if task_content["time"] not in task_info:
        #   return_dict = {"added_successfully": "true",
        #                     "task_received": task_content}
        #     task_info[task_content["time"]] = task_content
        #     return jsonify(return_dict)

        # return_dict = {"added_successfully": "false",
        #                 "task_received": {}}
        # return jsonify(return_dict)

# @app.route("/tasklist")
# def get_task_list():
#     return jsonify(task_info)

@app.route("/signup", methods=['POST'])
def signup():
    if request.method == 'POST':
        signup_content = request.get_json()

        user = User(signup_content["firstname"], signup_content["lastname"], signup_content["email"], signup_content["password"])

        db.session.add(user)
        db.session.commit()

@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        login_content = request.get_json()

        # q = db.session.query(User)
        # q.filter(User.email == login_content["email"])
        has_email = User.query.filter_by(email=login_content["email"])

        if len(has_email) == 1:
            
            user = has_email[0]

            if user["password"] == login_content["password"]:
                
                return_login_dict = {user["firstname"], user["lastname"], user["email"], user["password"]}

                return jsonify(return_login_dict)

            if user["password"] != login_content["password"]:

                return_login_dict = {}

                return jsonify(return_login_dict), status.HTTP_404_NOT_FOUND
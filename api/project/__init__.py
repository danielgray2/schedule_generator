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
    time = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, name, time, user_id):
        self.name = name
        self.time = str(time)
        self.user_id = user_id

@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

@app.route('/additem', methods=['POST'])
def index():

    if request.method == 'POST':
        task_content = request.get_json()

        if task_content["user_id"] == "":
            return jsonify({}), status.HTTP_401_UNAUTHORIZED

        has_task = Task.query.filter_by(user_id=task_content["user_id"], time=str(task_content["time"])).all()
        if len(has_task) == 0:
            task = Task(task_content["task_description"], str(task_content["time"]), task_content["user_id"])

            db.session.add(task)
            db.session.commit()
            return_task_dict = {"task_description": task_content["task_description"], "time": task_content["time"], "user_id": task_content["user_id"]}

            return jsonify(return_task_dict)

        return jsonify({}), status.HTTP_404_NOT_FOUND

@app.route("/tasklist", methods=["POST"])
def task_list():
    if request.method == "POST":
        task_content = request.get_json()

        if task_content["user_id"] == "":
            return jsonify({}), status.HTTP_401_UNAUTHORIZED

        tasks = Task.query.filter_by(user_id=task_content["user_id"]).all()
        ret_list = []
        for task in tasks:
            curr_dict = {}
            curr_dict["id"] = task.id
            curr_dict["task_description"] = task.name
            curr_dict["time"] = int(task.time)
            ret_list.append(curr_dict)

    return jsonify(ret_list)

@app.route("/signup", methods=['POST'])
def signup():
    if request.method == 'POST':
        signup_content = request.get_json()

        if signup_content["email"] == "" or signup_content["firstname"] == "" or signup_content["lastname"] == "" or signup_content["password"] == "":
            return jsonify({}), status.HTTP_404_NOT_FOUND

        users_with_email = User.query.filter_by(email=signup_content["email"]).all()
        if(len(users_with_email) == 0):
            user = User(signup_content["firstname"], signup_content["lastname"], signup_content["email"], signup_content["password"])
            db.session.add(user)
            db.session.commit()

            return jsonify({})
    
    return jsonify({}), status.HTTP_404_NOT_FOUND

@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        login_content = request.get_json()

        has_email = User.query.filter_by(email=login_content["email"]).all()
        if len(has_email) == 1:
            
            user = has_email[0]

            if user.password == login_content["password"]:
                
                return_login_dict = {"firstname": user.firstname, "lastname": user.lastname, "email": user.email, "id": user.id}

                return jsonify(return_login_dict)

        return_login_dict = {}
        return jsonify(return_login_dict), status.HTTP_404_NOT_FOUND
import firebase_admin
from flask import Blueprint, render_template
from firebase_admin import credentials

# secret_path =

cred = credentials.Certificate(
        "./.secret/testfrostcode-firebase-adminsdk-ayrxz-5eac64d01b.json")
firebase_admin.initialize_app(cred)


router = Blueprint('public', __name__, url_prefix="/")


@router.route('/')
def home():
    return render_template('index.html')


@router.route('/todos', methods=['GET'])
def listTodolist():
    return "GET"


@router.route('/todos', methods=['POST'])
def addItem():
    return "POST"


@router.route('/todos', methods=['GET'])
def deleteItem():
    return "DELETE"

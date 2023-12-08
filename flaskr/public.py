from flask import Blueprint, render_template, url_for
from . import cred

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

import firebase_admin
import os
from flask import Flask
from firebase_admin import credentials

path = os.path.join(
        os.getcwd(),
        'flaskr/.secret/testfrostcode-firebase-adminsdk-ayrxz-5eac64d01b.json'
        )
cred = credentials.Certificate(path)
firebase_admin.initialize_app(cred)


def create_app():
    app = Flask(__name__)

    from . import public

    app.register_blueprint(public.router)

    return app

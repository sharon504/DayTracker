from flask import Flask

def create_app():
    app = Flask(__name__)

    from .views import public

    app.register_blueprint(public.router)

    return app

#!/usr/bin/env python

import os
import os.path
import sys

from pprint import pprint

from flask import render_template, Flask


def configure_app(app, filename):

    app.config.from_pyfile(os.path.abspath('settings_default.py'))
    try:
        app.config.from_pyfile(os.path.abspath(filename))
    except IOError, e:
        print e
    pprint(app.config)


def configure_before_handlers(app):
    pass
    """
    @app.before_request
    def authenticate():
        g.user = getattr(g.identity, 'user', None)
    """


def configure_error_handlers(app):

    from flask import jsonify
    from werkzeug.exceptions import default_exceptions
    from werkzeug.exceptions import HTTPException

    def make_json_error(ex):
        response = jsonify(message=str(ex))
        response.status_code = (ex.code 
                if isinstance(ex, HTTPException)
                else 500)
        return response
                            
    for code in default_exceptions.iterkeys():
        app.error_handler_spec[None][code] = make_json_error


def configure_extensions(app):
    from extensions import db, Assets

    db.init_app(app)
    db.app = app
    db.metadata.bind = db.get_engine(app)
    db.metadata.reflect()


    if app.config['FRONTEND']:
        Assets.register_app(app)

    """
    Login.manager.setup_app(app)

    @Login.manager.user_loader
    def load_user(userid):
        return User(userid)
    """


def configure_routes(app):

    from views import Tracks, Albums

    app.register_blueprint(Tracks.api, url_prefix='/tracks')
    app.register_blueprint(Albums.api, url_prefix='/albums')

    if app.config['FRONTEND']:
        @app.route("/")
        def index():
            return render_template('index.html')

def init_app(config='settings_prod.py'):

    app = Flask(__name__)

    configure_app(app, config)
    configure_before_handlers(app)
    configure_error_handlers(app)
    configure_extensions(app)
    configure_routes(app)

    if not app.debug:
        from werkzeug.contrib.fixers import ProxyFix
        app.wsgi_app = ProxyFix(app.wsgi_app)

    return app

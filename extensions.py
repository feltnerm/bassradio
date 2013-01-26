#!/usr/bin/env python

from flask.ext.assets import Environment, Bundle
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import (LoginManager, current_user, login_required, 
        login_user, logout_user)

class Assets:


    @staticmethod
    def register_app(app):

        assets = Environment()

        js_libs = Bundle("js/lib/jquery.js", "js/lib/boostrap.js", 
                "js/lib/json2.js", "js/lib/underscore.js", 
                "js/lib/backbone.js", "js/plugins.js", 
                filters=None,
                output='gen/libs.js')

        js_libs_min = Bundle(js_libs, 
                filters='jsmin', 
                output='gen/libs-min.js')

        css_libs = Bundle("css/lib/bootstrap.css", 
                "css/lib/bootstrap-responsive.css",
                "css/main.css",
                filters=None,
                output='gen/libs.css')

        css_libs_min = Bundle(css_libs,
                filters='cssmin',
                output='gen/libs-min.css')

        bundles = {
                'js_libs': (js_libs if app.debug else js_libs_min),
                'css_libs': (css_libs if app.debug else css_libs_min)
                }

        assets.init_app(app)
        assets.register(bundles)

class Login:

    manager = LoginManager()
    login = login_user
    logout = logout_user
    current_user = current_user

db = SQLAlchemy()


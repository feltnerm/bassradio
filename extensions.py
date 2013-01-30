#!/usr/bin/env python

import logging

from flask.ext.assets import Environment, Bundle
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import (LoginManager, current_user, login_required, 
        login_user, logout_user)


class Assets:

    @staticmethod
    def register_app(app):

        assets = Environment()

        lastfm_api = Bundle(
                "js/lib/javascript-last.fm-api/lastfm.api.js",
                "js/lib/javascript-last.fm-api/lastfm.api.cache.js",
                "js/lib/javascript-last.fm-api/lastfm.api.md5.js"
                )
        

        js_libs = Bundle("js/lib/jquery.js", "js/lib/bootstrap.js", 
                "js/lib/json2.js", "js/lib/underscore.js", 
                "js/lib/backbone.js", "js/lib/ICanHaz.js",
                lastfm_api,
                "js/lib/bxslider-4/jquery.bxslider.js",
                "js/plugins.js", 
                filters='jsmin',
                output='gen/libs.js')

        css_libs = Bundle("css/lib/bootstrap.css", 
                "css/lib/bootstrap-responsive.css",
                "js/lib/bxslider-4/jquery.bxslider.css",
                "css/main.css",
                filters='cssmin',
                output='gen/libs.css')

        #app_js = Bundle("coffee/app.coffee",
        #        filters="coffeescript,jsmin",
        #        output="gen/app.js")
        app_js = Bundle("js/app.js", 
                "js/plugins/lastfm.js",
                
                "js/models/song.js",
                "js/collections/songs.js",
                "js/models/album.js",
                "js/models/artist.js",
                "js/collections/albums.js",
                "js/collections/query.js",
                "js/collections/searchlist.js",

                "js/views/songtable.js",

                "js/views/album.js",
                "js/views/artist.js",
                "js/views/browser.js",

                "js/views/nowplaying.js",
                "js/views/searchbar.js",
                "js/views/navigation.js",
                "js/views/controller.js",

                "js/views/app.js",

                "js/routers/app.js",

                "js/main.js",
                filters='jsmin',
                output="gen/app.js")

        bundles = {
                'js_libs': js_libs,
                'css_libs': css_libs,
                'app_js': app_js
                }

        assets.init_app(app)
        assets.register(bundles)
        app.logger.debug("Assets loaded")

class Login:

    manager = LoginManager()
    login = login_user
    logout = logout_user
    current_user = current_user

db = SQLAlchemy()


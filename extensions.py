#!/usr/bin/env python

from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import (LoginManager, current_user, login_required, 
        login_user, logout_user)

class Login:

    manager = LoginManager()
    login = login_user
    logout = logout_user
    current_user = current_user

db = SQLAlchemy()


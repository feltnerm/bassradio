
from helpers import to_json
from extensions import db

class Item(db.Model):
    __table__ = db.Table('items', db.metadata, autoload=True)

    def to_json(self):
        return to_json(self, Item)


class Album(db.Model):
    __table__ = db.Table('albums', db.metadata, autoload=True)


class User(object):

    def __init__(self, userid):
        self.userid = userid

    def __str__(self):
        return "User<name: %s>" % self.userid

    def authenticate(self, password):
        return True

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.userid

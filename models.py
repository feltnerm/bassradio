import math

from flask import abort

from unidecode import unidecode

from helpers import format_time, to_json
from extensions import db

from logging import getLogger
logger = getLogger("bassradio")


class AlbumQuery(db.Query):

    def as_list(self, key, value=None):
        filter_mapping = {
                'album': Album.album
            }

        if key not in filter_mapping:
            abort(404)

        if value is None:
            query = self(filter_mapping[key]).distinct()
        else:
            query = self.filter(filter_mapping[key].startswith(value))
        
        return query

    def sort(self):
        return self.order_by(Album.year) \
                .order_by(Album.album) \

    def to_json(self):
        for i in self.all():
            yield i.json


class Album(db.Model):
    __table__ = db.Table('albums', db.metadata, autoload=True)
    __tablename__ = 'albums'
    query_class = AlbumQuery

    def sort(self):
        return self.order_by(Album.name) \
                .order_by(Album.year) \
                .order_by(Album.disc) \
                .order_by(Album.artist) \

    @property
    def json(self):

        result = dict.fromkeys([key for key in self.__table__.columns.keys()])
        for key in result.iterkeys():
            result[key] = getattr(self, key, None)

        return result

    @property
    def length_formatted(self):
        return format_time(self.length)


class ItemQuery(db.Query):

    def as_list(self, key, value=None):
        filter_mapping = {
                'artist': Item.artist,
                'title': Item.title
            }
        if key not in filter_mapping:
            abort(404)

        if value is None:
            query = self.filter(filter_mapping[key]).distinct()
        else:
            query = self.filter(filter_mapping[key].startswith(value))
        
        return query

    def sort(self):
        return self.order_by(Item.artist) \
                .order_by(Item.year) \
                .order_by(Item.album) \
                .order_by(Item.disc) \
                .order_by(Item.track) \
                .order_by(Item.title)

    def to_json(self):
        for i in self.all():
            yield  i.json


class Item(db.Model):
    __table__ = db.Table('items', db.metadata, autoload=True)
    __tablename__ = 'items'
    query_class = ItemQuery

    @property
    def json(self):

        result = dict.fromkeys([key for key in self.__table__.columns.keys()])
        for key in result.iterkeys():
            val = getattr(self, key, None)
            if (isinstance(val, unicode) or 
                isinstance(val, str)):
                try:
                    val = unidecode(val)
                    result[key] = val
                except:
                    pass
                    #raise Exception((repr(val), type(val)))
            else:
                result[key] = val

        return result


    @property
    def length_formatted(self):
        return format_time(self.length)


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

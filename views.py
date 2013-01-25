from flask import Blueprint, abort, jsonify

from extensions import db

from models import Item, Album

class Tracks:
    api = Blueprint('tracks', __name__)

    @api.route("/<int:id>/", defaults={'id': None})
    def index(id):
        track = Item.get_or_404(id)
        return jsonify(track=track.__dict__)


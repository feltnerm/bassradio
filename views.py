from flask import Blueprint, abort, jsonify

from extensions import db

from models import Item, Album

class Tracks:
    api = Blueprint('tracks', __name__)

    @api.route("/<int:id>/")
    def index(id):
        track = Item.query.get_or_404(id)
        return jsonify(track=track.to_json())


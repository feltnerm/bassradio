from flask import request

def request_wants_json():
    """
    usage:
    from flask import jsonify, render_template

    @app.route('/')
    def show_items():
        items = get_items_from_database()
        if request_wants_json():
            return jsonify(items=[x.to_json() for x in items])
        return render_template('show_items.html', items=items)
    """
    best = request.accept_mimetypes \
            .best_match(['application/json', 'text/html'])
    return best == 'application/json' and \
            request.accept_mimetypes[best] > \
            request.accept_mimetypes['text/html']


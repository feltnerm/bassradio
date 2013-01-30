br.Collections.Albums = Backbone.Collection.extend({
    model: br.Models.Album,
    initialize: function (models, options) {
        if (models)
            _.each(models, function (m) {
                var album = new br.Models.Album({ id: m });
                album.fetch();
                this.add(album);
            }, this);
        _.bindAll(this);
    }
});


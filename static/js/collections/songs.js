br.Collections.Songs = Backbone.Collection.extend({
    model: br.Models.Song,
    initialize: function (models, options) {
        if (models)
            _.each(models, function (m) {
                var song = new br.Models.Song({ id : m })
                song.fetch();
                this.add(song);
            }, this);
        _.bindAll(this);
    }
});

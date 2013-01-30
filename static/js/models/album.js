br.Models.Album = Backbone.Model.extend({
    serialize: function () {
        var json = {};
        json = _.omit(this.attributes, "songs");
        json.songs = this.get('songs').serialize();
        return json;
    },

    url: function () {
        if (!this.collection)
            return '/api/album/' + this.id;
        Backbone.Model.prototype.url.call(this);
    },

    lastfm_sync: function () {
        if (br.plugins.lastfm) {
            var that = this;
            br.plugins.lastfm.album.getInfo(
                    { 'mbid': this.get('mb_albumid')},
                    {
                        success: function (data) {
                            that.set('lastfm', data.album);
                            that.fetch({ update: true });
                            that.trigger('lastfm-success');
                        },
                        error: function (code, error) {
                            console.log(code, error);
                            that.trigger('lastfm-error');
                        }
                    });
        }
    },

    fetch_all: function () {
        this.get('songs').query();
        this.lastfm_sync();
    },

    initialize: function (attributes, options) {
        this.attributes = attributes;
        this.options = options;
        this.set('songs', new br.Collections.Query([], {
            object_type: 'songs',
            query: "album_id:" + this.id
        }));

        this.on({
            "sync:songs": 
                function () {
                    this.trigger('final-sync');
            }
        });

        this.on("request", this.fetch_all);
    }

});

br.Models.Artist = Backbone.Model.extend({
    idAttribute: 'artist',
    urlRoot: '/api/artist',

    defaults: {
        artist: '<unknown>',
    },

    serialize : function () {
        var json = {};
        json.artist = this.get('artist');
        json.songs = this.get('songs').serialize();
        json.albums = this.get('albums').serialize();
        json.lastfm = this.get('lastfm');
        json.photos = this.get('photos');
        console.log(json);
        return json;
    },

    url: function () {
        if (!this.collection)
            return '/api/artist/' + this.id;
        Backbone.Model.prototype.url.call(this);
    },

    parse: function (response) {
        var result = {
            artist: response.artist,
        };
        return result;
    },

    lastfm_sync: function () {
        if (br.plugins.lastfm) {
            var that = this;
            br.plugins.lastfm.artist.getInfo({ artist: this.get('artist')}, {
                success: function (data) {
                    that.set('lastfm', data.artist);
                    that.set('photos', _.reduce(data.artist.image, 
                        function (memo, i) {
                            var key = i['size'];
                            var val = i['#text'];
                            memo[key] = val;
                            return memo;
                        }, {}, this));
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
        this.get('albums').query();
        this.lastfm_sync();
    },

    initialize: function (attributes, options) {
        _.bindAll(this);
        this.set('songs', new br.Collections.Query([], {
            object_type: "song",
            query: "artist:"+this.id.inquotes(),
        }));
        this.set('albums', new br.Collections.Query([], {
            object_type: "album",
            query: "artist:"+this.id.inquotes(),
        }));

        this.on({
            'sync:songs sync:albums': 
                function () {
                    this.trigger('final-sync')
                }
        });
        this.on("request", this.fetch_all);
    }
});

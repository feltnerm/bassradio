br.Models.Song = Backbone.Model.extend({

    serialize: function () {
        console.log(this.toJSON());
        return this.toJSON();
    },

    url: function () {
        if (!this.collection)
            return '/api/song/' + this.id;
        Backbone.Model.prototype.url.call(this);
    },

    parse: function (response) {
        return response;
    },

    lastfm_sync: function () {
        if (br.plugins.lastfm) {
            var that = this;
            br.plugins.lastfm.album.getInfo(
                    { 'mbid': this.get('mb_trackid')},
                    {
                        success: function (data) {
                            that.set('lastfm', data.track);
                            that.trigger('lastfm');
                        },
                        error: function (code, error) {
                            console.log(code, error);
                        }
                    });
        }
    },
    
    fetch_all: function () {
        this.lastfm_sync();
        this.trigger('fetched-all');
    },

    initialize: function (attributes, options) {
        this.attributes = attributes;
        this.options = options;
        _.bindAll(this);
    }

});

br.Routers.App =  Backbone.Router.extend({

    index: function () {
        this.appView.show_browser();
    },

    artist: function (id) {
        var id = decodeURIComponent(id);
        this.appView.show_artist(id);
    },

    album: function (id) {
        var id = decodeURIComponent(id);
        this.appView.show_album(id);
    },

    song: function (id) {
        var id = decodeURIComponent(id);
        this.appView.show_song(id);
    },

    playlists: function () {
        console.log("playlist not implemented");
    },

    routes: { 
        "artist/:id": "artist",
        "album/:id": "album",
        "song/:id": "song",
        "search/": "search",
        "playlist/": "playlists",
        "": "index"
    },

    initialize: function () {
        this.appView = new br.Views.App();

        Backbone.history.start({
            pushState: false,
            root: "/"
        });
        _.bindAll(this);

    }
});

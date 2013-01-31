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

    search: function (object_type, search_query) {
        this.appView.show_browser(object_type, search_query);
    },

    login: function () {
        this.appView.show_login();
    },

    routes: { 
        "artist/:id": "artist",
        "album/:id": "album",
        "song/:id": "song",
        "search/:object_type/:search_query": "search",
        "playlist/": "playlists",
        "login": "login",
        "": "index"
    },

    authenticate: function () {
        if (!this.current_user.get('token')) {
            Backbone.router.navigate("login", { trigger: true });
        } 
    },

    events: {
        "route": "authenticate"
    },

    initialize: function () {
        this.appView = new br.Views.App();
        this.current_user = new br.Models.User();

        Backbone.history.start({
            pushState: true,
            root: "/"
        });
        this.on('route', this.authenticate);
        _.bindAll(this);

    }
});

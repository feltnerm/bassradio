br.Views.App = Backbone.View.extend({
    $app: $("#app"),

    show_artist: function (id) {
        this.artist = new br.Models.Artist({ artist: id });
        this.artist.fetch();
        this.artistView = new br.Views.Artist({ model: this.artist }); 

        if (this.currentView)
            this.currentView.remove();

        this.artistView.once("ready", function () {
            this.$el.append(this.artistView.render().el);
            this.currentView = this.artistView;
        }, this);
    },
    
    show_album: function (id) {
        this.album = new br.Models.Album({ id: id });
        this.album.fetch();
        this.albumView = new br.Views.Album({ model: this.album }); 

        if (this.currentView)
            this.currentView.remove();

        this.albumView.once("ready", function () {
            this.$el.append(this.albumView.render().el);
            this.currentView = this.albumView;
        }, this);
    },

    show_song: function (id) {
        this.song = new br.Models.Song({ id: id });
        this.song.fetch();
        this.songView = new br.Views.Song({ model: this.album }); 

        if (this.currentView)
            this.currentView.remove();

        this.songView.once("ready", function () {
            this.$el.append(this.songView.render().el);
            this.currentView = this.songView;
        }, this);
    },

    render_browser: function (browser) {
        this.browserView = new br.Views.Browser({ model: browser }); 
        this.$el.append(this.browserView.render().el);
        this.currentView = this.browserView;
    },

    show_browser: function () {
        //this.browserView = new br.Views.Browser();
    },

    render: function () {
        this.render_sub_views();
        this.$app.prepend(this.el);
    },

    render_sub_views: function () {
        this.navigation.render();
        this.searchBar.render();
        this.$el.append(this.controller.render().el);
        this.currentView;
    },

    create_sub_views: function () {
        this.navigation = new br.Views.Navigation();
        this.searchBar = new br.Views.Searchbar();
        this.controller = new br.Views.Controller();
    },

    initialize: function () {
        this.create_sub_views();
        this.render();
        _.bindAll(this, 'show_album', 'show_song', 'show_album');
    }
});

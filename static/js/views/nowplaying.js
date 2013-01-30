br.Views.NowPlaying = Backbone.View.extend({
    className: "nowplaying-container row-fluid",

    create_sub_views: function () {
        this.controller = new br.Views.Controller();
        this.itemInfo = new br.Views.ItemInfo();
    }, 

    render: function () {
        $(this.el).html("<h3>Now playing</h3>");
        return this
    },

    model: br.Models.Song,
    initialize: function () {
    }
});

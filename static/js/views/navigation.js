br.Views.Navigation = Backbone.View.extend({
    template: 'navbar-template',
    className: 'navbar',
    el: $("body"),

    render: function () {
        var html = ich[this.template]({});
        this.$el.prepend(html);
        return this;
    },

    events: {
        "click .brand": function () {
            br.app.navigate("");
        },
        "click #playlists": function () {
            br.app.navigate("playlists/");
        }
    },

});

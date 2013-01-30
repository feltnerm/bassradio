br.Views.Artist = Backbone.View.extend({
    className: "artist-view",
    template: "artist-template",
    model: br.Models.Artist,

    render: function () {
        this.$el.empty();
        html = ich[this.template](this.model.serialize());
        this.$el.append(html);
        this.songTable = new br.Views.SongTable({
            collection: this.model.get('songs')
        });
        this.$el.append(this.songTable.render().el);
        return this; 
    },

    initialize: function (options) {
        _.bindAll(this, "remove", "render");

        this.listenTo(this.model, "remove", this.remove);
        this.listenTo(this.model, "reset", this.render);
        this.listenTo(this.model, "sync", function () {
            this.trigger('ready');
        });
        this.listenTo(this.model, "lastfm-success", function () {
            this.render();
        });
    }

});

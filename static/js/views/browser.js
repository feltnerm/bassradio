br.Views.Browser = Backbone.View.extend({
    className: "browser-view", 
    template: "browser-template",
    collection: br.Collections.Query, 

    render: function () {
        this.$el.empty();
        html = ich[this.template](this.collection.serialize());
        this.$el.append(html);
        this.songTable = new br.Views.SongTable({
            collection: this.collection
        });
        this.$el.append(this.songTable.render().el);
        return this;
    },

    initialize: function (options) {
        _.bindAll(this, "render", "remove");

        this.listenTo(this.collection, "remove", this.remove);
        this.listenTo(this.collection, "reset", this.reset);
        this.listenTo(this.collection, "sync", function () {
            this.trigger('ready');
        });
    }
});

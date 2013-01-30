br.Views.SongRow = Backbone.View.extend({
    template: "songtable-row-template",
    tagName: "tr",
    className: "songtable-row",
    
    initialize: function (options) {
        this.listenTo(this.model, "change", this.render);
    },

    render: function () {
        var model = this.model;
        var html = ich[this.template](this.model.toJSON());
        this.$el.empty().append(html);
        return this;
    }

});

br.Views.SongTable = Backbone.View.extend({
    className: "songtable-container",
    template: 'songtable-template',

    remove: function (song) {
        if (song.id in this.collection)
            delete this.collection[song.id];
    },

    initialize: function () {
        _.bindAll(this);

        var html = ich[this.template]();
        this.$el.append(html);
        
        _.bind(this.$el.scroll, this);
        this.$tbody = this.$el.find(".songtable-data");
        this.$el.scroll( function () {
            if (this.collection.hasMore() && 
               this.scrollHeight - (this.scrollTop + this.clientHeight) 
               < 2000)
                    this.collection.more();
        });

        this.listenTo(this.collection, "remove", this.remove);
        this.listenTo(this.collection, "reset", this.reset);
        this.listenTo(this.collection, "more", this.more);
        this.render();

     },

     remove: function (song) {
        if (song.id in this.songRows)
            delete this.songRows[song.id];
     },

     appendSong: function (song) {
        var row;
        if (!(song.id in this.songRows))
            row = this.songRows[song.id] = new br.Views.SongRow({ model: song, });
        this.$tbody.append(row.render().el);
     },

     render: function() {
        this.$tbody.empty().scrollTop(0);
        this.songRows = {};
        this.collection.each(this.appendSong);
        return this;
     },

     render_more: function (more) {
        more.each(this.appendSong);
     },

     scrollTo: function(song) {
        if (!(song.id in this.songRows))
            return
        var offset = this.songRows[song.id].$el.offset().top;
        if (this.$el.scrollTop() + this.$el.height() >= offset)
            return
        this.$el.scrollTop(offset - this.$el.height() / 2);
     }
});

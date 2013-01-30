br.Views.Searchbar = Backbone.View.extend({
    el: ("#searchbar"),

    render: function () {
        this.$artist_query = $("input[name='artist-search']");
        this.$album_query = $("input[name='album-search']");
        this.$song_query = $("input[name='song-search']");

        this.$artist_query.typeahead({
            source: function (query, process) {
                $.get('/api/list/artist/'+query, function (data) {
                    console.log(data);
                    process(data);
                });
            },
            updater: function (item) {
                br.app.navigate("artist/" + encodeURIComponent(item), { trigger: true });
            }
        });
        this.$album_query.typeahead({
            source: function (query, process) {
                $.get('/api/list/album/'+query, function (data) {
                    process(_.values(data));
                });
            },
            updater: function (item) {
                $.get('/api/list/album/' + encodeURIComponent(item), 
                     function (data) {
                         br.app.navigate("album/" + 
                            encodeURIComponent(
                                _.first(_.keys(data))), 
                         { trigger: true });
                });
            }
        });
        this.$song_query.typeahead({
            source: function (query, process) {
                $.get('/api/list/title/'+query, function (data) {
                    process(_.values(data));
                });
            },
            updater: function (item) {
                $.get('/api/list/title/' + encodeURIComponent(item),
                     function (data) {
                        br.app.navigate('song/'+
                                       _.first(_.keys(data)),
                        { trigger: true });
                });
            }
        });
    },

    initialize: function () {
        _.bindAll(this);

    }
});

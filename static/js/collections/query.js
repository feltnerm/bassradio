br.Collections.Query = Backbone.Collection.extend({
    serialize: function () {
        return this.toJSON(); 
    },

    url: function () {
        var query = "api/query/" 
            + encodeURIComponent(this.options.object_type);

        if (this.options.query) {
            query += "/";
            var fields = this.options.query.split(":");
            if (fields.length <= 1) {
                query += encodeURIComponent(fields[0]);   
            } else {

                query += encodeURIComponent(fields[0]) + ":" 
                    + encodeURIComponent(fields[1]);
            }

        }
        query += "?offset=" + encodeURIComponent(this.offset) +
        (this.options.limit == 0 ? "" : "&limit=" + this.options.limit);
        console.log(query);
        return query;
    },

    hasMore: function() {
        return this.offset < this.total;
    },

    more: function (options) {
        if (!this.hasMore())
            return;
        this.options = _.extend(this.options, { limit : 300 }, _.pick(options || {}, "limit"));
        this.fetch({ 
            silent: false, remove: false, 
            add: true, update: true, 
            success : function (collection, response) {
                collection.trigger('more', _(collection.model.slice(response.offset)));
                if (options && options.success)
                    options.success();
            }});
    },
    query: function (options) {
        this.options = _.extend(this.options, _.pick(options || {}, "limit", "object_type", "query"));
        this.offset = 0;
        this.total = 0;
        
        this.fetch({ reset: true });
    },

    parse: function (response) {
        this.total = response.total;
        this.offset = response.offset + response[this.options.object_type].length;
        var result = {};
        var models = _.map(response[this.options.object_type], 
          function (obj) {
            var model;
            if (this.options.object_type == "songs") model = br.Models.Song;
            if (this.options.object_type == "artists") model = br.Models.Artist;
            if (this.options.object_type == "albums") model = br.Models.Album;
            return new model(obj);
          }, this);
          return models;
    },

    initialize: function (models, options) {
        this.options = _.extend({ limit: 300, object_type: "all", 
                                query: ""}, options);
        this.object_type = this.options.object_type || "song";
    }
});

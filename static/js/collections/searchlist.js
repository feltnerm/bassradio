br.Collections.SearchList = Backbone.Collection.extend({
    url: function () {
        return "api/list/" + encodeURIComponent(this.options.queryType) 
            + (this.options.query === "" ? "" : "/" + encodeURIComponent(this.options.query));
    },

    query: function (options) {
        this.options = _.extend({ queryType: "" , query: ""}, _.pick(options || {}, "queryType", "query" ));
        this.fetch({ reset: true })
    },

    initialize: function (options) {
        this.options = {};
        this.options.queryType = "";
        this.options.query = "";
    }

});

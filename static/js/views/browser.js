br.Views.Browser = Backbone.View.extend({
    className: "browser-container", 

    render: function () {
        return this;
    },

    initialize: function (options) {
        if (options && options.collection)
            this.collection = new options.collection();
    }
});

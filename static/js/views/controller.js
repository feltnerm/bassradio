br.Views.Controller = Backbone.View.extend({
    className: "controller-view",
    template: "controller-template",
    model: br.Models.Song,

    render: function (model) {
        return this; 
    },

    initialize: function (model) {
        _.bindAll(this, "render");
        this.model = model;
        //this.listenTo(this.model, "change", this.render);

    },
})

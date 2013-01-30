br.Views.SongTableRow = Backbone.View.extend({
    tagName: "tr",
    model: br.Models.Song,
    template: 'songtable-row-template',

    render: function () {
        $(this.el).html(ich[this.template](this.model.attributes));
        return this;
    },
});

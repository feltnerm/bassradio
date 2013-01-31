br.Models.User = Backbone.Model.extend({
    url: function () {
        if (this.get('username'))
            return '/api/users/u/' + this.username
        return ''
    },

})

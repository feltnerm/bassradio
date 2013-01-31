br.Views.Login = Backbone.View.extend({
    className: "login-view",
    template: "login-template",
    
    events: {
        "click #login-btn": "login"
    },

    render: function () {
        var html = ich[this.template]({});
        $(this.el).html(html)
        return this;
    },

    login: function (event) {
        event.preventDefault();
        var formValues = {
            username: $("#inputUsername").val(),
            password: $("#inputPassword").val(),
        };
        var that = this;
        $.ajax({
            type: "POST",
            url: "/api/user/login",
            data: formValues,
            success: function (data) {
                if (data.error) {
                    if (data.error = "Invalid username.")
                        console.log(data.error);

                } else {
                    br.app.current_user.set(data);
                    that.trigger("logged-in");
                    Backbone.history.navigate("#");
                    console.log(data);
                }
            },
            error: function (error) {
                console.log(error);
            },
            dataType: "json"
        });

    },

    logout: function () {
        $.ajax({
            type: "POST",
            url: "/api/user/logout",
            success: function (data) {
                if (!data.error) {
                    this.reset();
                    this.trigger("logged-out");
                }
                console.log(data);
            },
            dataType: "json"
        });
    },
});

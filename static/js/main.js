$(function () {
    
    $.ajaxSetup({
        dataType: "json",
        statusCode: {
            401: function() {
                window.location.replace("/#login");
            },
            403: function () {
                window.location.replace("/#denied");
            }
        }
    });

    br.app = new br.Routers.App();

    console.log("Get in the Bronco!!!");

});


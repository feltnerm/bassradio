$(function () {
    
    $.ajaxSetup({
        dataType: "json",
    });

    br.app = new br.Routers.App();

    console.log("Get in the Bronco!!!");

});


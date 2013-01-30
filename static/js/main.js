$(function () {
    
    $.ajaxSetup({
        dataType: "json",
    });

    br.app = new br.Routers.App();

    $('.bxslider').bxSlider();
    console.log("Get in the Bronco!!!");

});


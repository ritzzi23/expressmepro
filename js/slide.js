$(document).ready(function(){
    $(".slide-changer").click(function(e){
        e.preventDefault();
        var slideId = $(this).attr("data-slide");
        var slide = $("#"+slideId);
        var currSlide = $(this).parents(".slide");
        if(slide=="undefined" || typeof(slide)=="undefined"){
            return 0;
        }
        requestAnimationFrame(function(){
            var slideOffset = slide.offset().top-20;
            $('body, html').stop().animate({
                scrollTop: slideOffset
            },2000);    
            currSlide.removeClass("active");
            slide.addClass("active");
        });
    });
});
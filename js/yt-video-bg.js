/**
 * YouTube Video Background
 * Author: Ayush Agarwal (Friendsocial Developer Network)
 * 
 * This script is designed to work specifically with ExpressMe theme designed by the same author.
 * Copyright 2017 | Ayush Agarwal (thisisayushaa@gmail.com)
 * No work below except the standard YouTube Iframe API shall be used without author's permission.
 */

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
    $(".bg-video").each(function(){
        if($(this).attr("data-enabled")=="0" || $(this).attr("data-enabled")==0){
            //do nothing
        }
        else{
            var ytContainer = $(this).find(".yt-video");
            var playerId = ytContainer.attr("id");
            var videoId = ytContainer.data("videoid");
            var player = new YT.Player(playerId,{
                width: ytContainer.width()+200,
                height: ytContainer.height()+200,
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                },
                playerVars: {autoplay:1, controls:0, disablekb:1, loop:1, modestBranding:1, showinfo:0, iv_load_policy:3, rel:0}
            });
        }
    });
}

function onPlayerReady(event) {
    var player = event.target;
    vidRescale(player);
    player.mute();
    player.playVideo();
    
    setInterval(function(){
        if(player.getPlayerState() == 0){
            player.seekTo(0);
        }
        if(player.getPlayerState() == -1)
        player.playVideo();
    },500);
}
function onPlayerStateChange(event) {
    var target = $(event.target.a);
    var player = event.target;
    requestAnimationFrame(function(){
        if(event.data==1)
            target.fadeIn();
        else if(event.data==2 || event.data == -1 || event.data == 5)
            player.playVideo();
        else if(event.data==0)
            event.target.seekTo(0);
        /*
        else if(event.data==3)
            target.fadeOut();
        */
        else 
            target.fadeOut(); 
    });
}
function vidRescale(player){
    var target = $(player.a);
    var w = target.parents(".background-wrapper").width(),
    h = target.parents(".background-wrapper").height();
    if (w/h > 16/9){
        player.setSize(w, w/16*9);
        target.css({'left': '0px'});
        target.css('top', -(((w/16*9)-h)/2)+"px"); //center video
    } else {
        player.setSize(h/9*16, h);
        target.css('left', -(((h/9*16)-w)/2)+"px"); //center video
    }   
    $(window).one("resize",function(){vidRescale(player);});
}
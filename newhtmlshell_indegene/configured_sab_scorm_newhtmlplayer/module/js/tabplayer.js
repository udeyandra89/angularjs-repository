$(document).ready(function(){
	// Tab feature V1//
var tab1="page3a.html"; var tab2="page3b.html"; var tab3="page3c.html";

$("#tab1").bind("click",function(){
   $(".nis_frame_emod").load(tab1, function( response, status, xhr ) {
			if ( status == "error" ) {
			     var msg = "Sorry no page found ";alert( msg + xhr.status + " " + xhr.statusText );location.reload();
									}
				$(".audio-pause").show();
		         $('.removeall_exceptlast:not(:first)').remove();
				  $("#audio-slideshow").attr("data-audio", "audio/extra/f3tab1.mp3");
                   $("audio").attr("src", "audio/extra/f3tab1.mp3");
				     $("#jquery_jplayer_2").jPlayer("play");
					 

	});

});
$("#tab2").bind("click",function(){
   $(".nis_frame_emod").load(tab2, function( response, status, xhr ) {
			if ( status == "error" ) {
			     var msg = "Sorry no page found ";alert( msg + xhr.status + " " + xhr.statusText );location.reload();
									}
				$(".audio-pause").show();
		         $('.removeall_exceptlast:not(:first)').remove();
				  $("#audio-slideshow").attr("data-audio", "audio/extra/f3tab2.mp3");
                   $("audio").attr("src", "audio/extra/f3tab2.mp3");
				     $("#jquery_jplayer_2").jPlayer("play");

	});

});
$("#tab3").bind("click",function(){
   $(".nis_frame_emod").load(tab3, function( response, status, xhr ) {
			if ( status == "error" ) {
			     var msg = "Sorry no page found ";alert( msg + xhr.status + " " + xhr.statusText );location.reload();
									}
				$(".audio-pause").show();
		         $('.removeall_exceptlast:not(:first)').remove();
				  $("#audio-slideshow").attr("data-audio", "audio/extra/f3tab3.mp3");
                   $("audio").attr("src", "audio/extra/f3tab3.mp3");
				     $("#jquery_jplayer_2").jPlayer("play");

	});

});
$(".close_box").bind("click",function(){
				   $(".nis_frame_emod").load("page3.html", function( response, status, xhr ) {
			if ( status == "error" ) {
			     var msg = "Sorry no page found ";alert( msg + xhr.status + " " + xhr.statusText );location.reload();
									}
				$(".audio-pause").show();
		         $('.removeall_exceptlast:not(:first)').remove();
				  $("#audio-slideshow").attr("data-audio", "audio/f3.mp3");
                   $("audio").attr("src", "audio/f3.mp3");
				     $("#jquery_jplayer_2").jPlayer("play");

	});
				 });
// End of Tab feature V1//
//  Tab feature V2//
var tabv2_1="page4a.html"; var tab2_2="page4b.html"; var tab2_3="page4c.html";
$("#tabv2_1").bind("click",function(){
  $(this).addClass("activex");
   $("#tabv2_2").removeClass("activex");
    $("#tabv2_3").removeClass("activex");
   $(".nis_frame_tabMode").load(tabv2_1, function( response, status, xhr ) {
			if ( status == "error" ) {
			     var msg = "Sorry no page found ";alert( msg + xhr.status + " " + xhr.statusText );location.reload();
									}
				$(".audio-pause").show();
		         $('.removeall_exceptlast:not(:first)').remove();
				  $("#audio-slideshow").attr("data-audio", "audio/extra/f3tab1.mp3");
                   $("audio").attr("src", "audio/extra/f3tab1.mp3");
				     $("#jquery_jplayer_2").jPlayer("play");
					   
	});

});
$("#tabv2_2").bind("click",function(){
 $(this).addClass("activex");
  $("#tabv2_1").removeClass("activex");
   $("#tabv2_3").removeClass("activex");
   $(".nis_frame_tabMode").load(tab2_2, function( response, status, xhr ) {
			if ( status == "error" ) {
			     var msg = "Sorry no page found ";alert( msg + xhr.status + " " + xhr.statusText );location.reload();
									}
				$(".audio-pause").show();
		         $('.removeall_exceptlast:not(:first)').remove();
				  $("#audio-slideshow").attr("data-audio", "audio/extra/f3tab2.mp3");
                   $("audio").attr("src", "audio/extra/f3tab2.mp3");
				     $("#jquery_jplayer_2").jPlayer("play");
                       
	});

});
$("#tabv2_3").bind("click",function(){
 $(this).addClass("activex");
  $("#tabv2_1").removeClass("activex");
   $("#tabv2_2").removeClass("activex");
       
    $(".nis_frame_tabMode").load(tab2_3, function( response, status, xhr ) {
			if ( status == "error" ) {
			     var msg = "Sorry no page found ";alert( msg + xhr.status + " " + xhr.statusText );location.reload();
									}
				$(".audio-pause").show();
		         $('.removeall_exceptlast:not(:first)').remove();
				  $("#audio-slideshow").attr("data-audio", "audio/extra/f3tab3.mp3");
                   $("audio").attr("src", "audio/extra/f3tab3.mp3");
				     $("#jquery_jplayer_2").jPlayer("play");
                      
	});

});			 
});
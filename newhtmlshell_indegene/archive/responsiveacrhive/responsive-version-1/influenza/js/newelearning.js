$(document).ready(function() {

$(".audiotranscript").bind("click",function(){
	
	$(".transcript_box").fadeIn();
});

	$(".closer").bind("click",function(){
		
		$(".close").hide();
		$(".popupbox").hide();
		
	});
		$(".closeres").bind("click",function(){
		
		$(".closeres").hide();
		$("#resourceloader").hide();
	});
	$(".cleaner").bind("click",function(){
		
		$(".loadlink").empty();
		$(".loadglossary").empty();
	});
	
$(".launch").fadeIn();
/*$("#audio-play").click(function(){*/

	$(".nis_wrapper_emod").show();
	$(".logout").click(function(){
	window.top.close();
	});

     $(".switch > label").removeClass("white-text");
});
$(window).load(function(){
    
    	setTimeout(function(){$(".preloader-box").fadeOut(); 
                            $(".switch > label").addClass("white-text");
                             }, 3500);
});
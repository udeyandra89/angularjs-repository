var num = 1;
var trackframe_suspend = [];
var totalframe_tracker = [1,2,3,4,5,6,7,8,9,10,11,12];
var trackframe_lessonlocation = [];
var trackframe_suspend_two;
var join_data;
var totalframejoin;
var pdf;
// create js output//
var canvas, stage, exportRoot;

function initme() {
	canvas = document.getElementById("canvas3");
	images = images||{};

	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt) {
	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {
	exportRoot = new lib.Untitled1();

	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);
	stage.update();

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);
}
function initme4() {
		canvas = document.getElementById("canvas4");
	exportRoot = new lib.Scenario_1();

	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);
	stage.update();

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);
}
// End//
//Scorm starts//
function send(){

	var field = document.getElementById("userText"),
		value = " Placeholder text ";
    
	
	if(field.value !== null && field.value !== ""){
		value = field.value;
	}
    trackframe_suspend.push(value);
    trackframe_lessonlocation.push(value);
    trackframe_suspend.sort();
    console.log(trackframe_lessonlocation);
    console.log(trackframe_suspend);
    trackframe_suspend_two = jQuery.unique(trackframe_suspend);
    console.log(trackframe_suspend_two);
    join_data = trackframe_suspend_two.join();  
    console.log(join_data);
	set('cmi.suspend_data', join_data);  
	set('cmi.core.lesson_location', value); 
    totalframejoin = totalframe_tracker.join();
    console.log(totalframejoin);
    
    if((join_data.length) == (totalframejoin.length))
        {
	show("Setting course status to 'completed'.");
	var callSucceeded = scorm.set("cmi.core.lesson_status", "completed");
    
	show("Call succeeded? " +callSucceeded);
    show("<hr>");
        }
}


function set(param, join_data){

	show("Sending: '" +join_data +"'");

	var callSucceeded = scorm.set(param, join_data);

	show("Call succeeded? " +callSucceeded);

}
function set(param, value){

	show("Suspend data/Bookmark data :");
	show("'" +value +"'");
	var callSucceeded = scorm.set(param, value);
	show("Call succeeded? " +callSucceeded);
        show("<hr>");

}

function showbookmarkpopup(param){
    var value = scorm.get(param);
    console.log("lesson location "+value);
     if(value > 1)
    {
     $(".bookmarkbox").show();
        $(".bookmarking_overlay").show();
       // alert("Its working ! great");
         $("#jquery_jplayer_2").jPlayer("pause");
        $(".audio-pause").removeClass("block");
    }
      else{
         $(".bookmarkbox").hide();
        $(".bookmarking_overlay").hide();
          $("#jquery_jplayer_2").jPlayer("play");
          send();
    }
}
function get(param){
   
	var value = scorm.get(param);
	show("Received visited data :");
	show("'" +value +"'");
    show("<hr>");
    var splitcmi = value.split(",");
    var extend = $.extend( trackframe_suspend , splitcmi );
    //trackframe_suspend.push(extend);
    trackframe_suspend_two = jQuery.unique(trackframe_suspend);
    console.log("splited array" +trackframe_suspend_two);
   // set('cmi.suspend_data', join_data);  
    var lessonlocation = scorm.get('cmi.core.lesson_location');
    num = lessonlocation;
  var bookmarkedpage = "page"+lessonlocation+".html";
    $(".bookmarkbox").hide();
        $(".bookmarking_overlay").hide();
         $(".audio-play").hide();
          $(".replay-audio").show();
    $(".framenames").hide();
    $(".sectionnames").hide();
    $("#fn"+lessonlocation).show();
    $("#sn"+lessonlocation).show();
    $(".launchbox").hide();
     $(".audio-pause").css({
                      "width": "33px","height":"33px"
                  });
                  $pauseButton.css({
                      
                  });
   $(".pageloader-box").fadeIn();
      $(".nis_frame_emod").load(bookmarkedpage, function(response, status, xhr) {
                          $(".frameno").html(lessonlocation+'/');
                          //chapterViewed(frame);
          $(".launch").hide();
            $("#audio-slideshow").attr("data-audio", "audio/f" + lessonlocation + ".mp3");
                      $("audio").attr("src", "audio/f" + lessonlocation + ".mp3");
                      $('.removeall_exceptlast:not(:first)').remove();
                      $("#jquery_jplayer_2").jPlayer("play");
                          if (status == "error") {
                              var msg = "Sorry no page found ";
                              alert(msg + xhr.status + " " + xhr.statusText);
                              location.reload();
                          }
                            if(status == "success")
                          {
                        $(".pageloader-box").fadeOut();     
                          }


                      });
   if((value.length) == 12)
   {
     show("Course is already 'completed'.");
	var callSucceeded = scorm.set("cmi.core.lesson_status", "completed");
    
	show("Call succeeded? " +callSucceeded);  
   }
    
}



function end(){

	show("Terminating connection.");
var caller = scorm.save(); 
	var callSucceeded = scorm.quit();
    
	show("Call succeeded? " +callSucceeded);
    show("Data saved to lms " +caller);

}


function show(msg){

	var debugText = document.getElementById("debugText");
	if(debugText){
		debugText.innerHTML += msg +"<br/>";
	}

	//Can also show data using pipwerks.UTILS.trace
	pipwerks.UTILS.trace(msg);


}

window.onunload = function (){
	end();
}
    



  $(document).ready(function() {
      // when the tag with id="buton" is clicked, performs a Ajax GET request to an XML file
      // gets the XML data, parses oits elements and dysplays its data
      // Toc's
               // Detect whether device supports orientationchange event, otherwise fall back to
// the resize event.
 //$(".orientation-changed").hide();  


$(".tableof_tab").hide();

      $(".togg").bind("click",function(){
      $("#debugConsole").toggle("slide");
      $(".inputData").toggle();
      });
  $("#no-bookmark").bind("click",function(){
  $(".bookmarking_overlay").fadeOut();
      $(".bookmarkbox").fadeOut();
      $("#jquery_jplayer_2").jPlayer("play");
      send();
  });
  //    $(".modal-close").bind("click",function(){
              
       //   });
				$(".contain_image").css({"bottom":"73px"});
			$("#responsive-icon").bind("click",function(){
                $(".menu-box").show();
				//$(".menu-box").css({"top":"0px","z-index":"-1"}).animate({"top":"55px","z-index":"4"},500);
				 $(this).html("<img src='images/muti-screen.png' />");
                 $(".tableof_content").hide();
                 $(".helpindex").hide();
                $(".menu-box").addClass("block");
                
				});
				 $("#moduleclose-icon").bind("click",function(){
                     $("#resourceloader").hide();
                      $(".close_resources").hide();
                     $(".menu-box").show();
					  	$(".menu-box").css({"top":"55px","z-index":"-1"}).animate({"top":"-73px","z-index":"-1"},600);
						 $("#responsive-icon").html("<img src='images/responsive-icon.png' />");
                     $(".menu-box").removeClass("block");
					 });
      $(".audiotranscriptor").bind("click", function() {
          $('.transcriptor').show();
          //$(this).hide();
          $(".close_transcript").fadeIn();
          $(".transcript_loader").fadeIn();
          $(".transcript_title").fadeIn();
      });
      $(".close_transcript").bind("click", function() {
          $(".transcriptor").fadeOut();
          $(".audiotranscriptor").show();
          $(this).fadeOut();
          $(".transcript_loader").fadeOut();
					 $(".transcript_title").fadeOut();
      });
      $(".tableindex").bind("click", function() {
          $(".close_resources").hide();
              $("#resourceloader").hide();
          $(".tableof_content").show();
          $(".audio-play").show();      
         $(".audio-pause").removeClass("block");
          $("#jquery_jplayer_2").jPlayer("pause");
          $(".toc_close").show();
          //$(".menu-box").show();
         // $(".menu-box").css({"top":"55px","z-index":"-1"}).animate({"top":"-73px","z-index":"-1"},600);
      });
      $(".toc_close").bind("click", function() {
          $(".tableof_content").hide();
          $(".audio-pause").show();
          $('.removeall_exceptlast:not(:first)').remove();
          var playerhead= $(".playhead").width();
          var timelinewidth =  $(".timeline").width();
                   if(playerhead == timelinewidth)
             {
             $("#jquery_jplayer_2").jPlayer("pause");
                 $(".audio-pause").hide();
             }
       else if(($(".timeline").hasClass("timelinecolor"))){
             $("#jquery_jplayer_2").jPlayer("pause");
           $(".audio-pause").hide();
           
                           }
            else{
                $("#jquery_jplayer_2").jPlayer("play");
           $(".audio-pause").show();
            }
          $(this).hide();
           $("#responsive-icon").html("<img src='images/responsive-icon.png' />");
           //$(".timeline").removeClass("timelinecolor");
      });
// Load tab pages //
     
      $.ajax({
          type: 'get',
          url: 'transcript/maintranscript.xml',
          beforeSend: function() {
              // before send the request, displays a "Loading..." messaj in the element where the response will be placed
              $('#resp').html('Loading...');
          },
          timeout: 10000, // sets timeout for the request (10 seconds)
          error: function(xhr, status, error) {
              alert('Error: ' + xhr.status + ' - ' + error);
          }, // alert a message in case of error
          dataType: 'xml',
          success: function(response) {
              $('#resp').html(''); // removes the "loading..." notification from "#resp"

              // gets and parse each child element in <webpages>
              $(response).find('framenumbers').children().each(function() {
                  var elm = $(this);
                  var frame = elm.attr('id');
                  var framename = elm.find('framename').text();
                  var sectionname = elm.find("sectionname").text();
                  var audiotranscript = elm.find('audiotranscript').text();
                  var information = elm.find('information').text();
                  $(".transcript_text:first").addClass("Tactive");
                  $(".framenames:first").addClass("Tactive");
                  $(".sectionnames:first").addClass("Tactive");
                  // displays data
                  $('.transcriptor').append('<div class="trnscript_text" id="f' + frame + '">' + audiotranscript + '</div>');
                  $(".information").append('<div class="light_box">' + information + '</div>');
                  $(".framename").append('<div class="framenames" id="fn' + frame + '">' + framename + '</div>');
                  $(".sectioname").append('<div class="sectionnames" id="sn' + frame + '">' + sectionname + '</div>');
                  $(".tableof_content ul").append('<a href="#" class="play-toc toclevel' + frame + ' page' + frame + '"><li id="toc' + frame + '">' + sectionname + '&nbsp;-&nbsp;' + framename + '</li></a>');
				     $(".tableof_tab ul").append('<a href="#" class="play-toc sectiontitle padding-0  page' + frame + '" id="page' + frame + '"><li id="toc' + frame + '"><span class="frameblock">' + framename + '</span><span class="hiphens">-</span><span class="sectionblock">' + sectionname + '</span></li></a>');
                  // Disable remaining frames//
               $(".page10").prop("disabled",true);
                  
                  // //
                  $(".page" + frame).bind("click", function() {
                      $(".timeline").removeClass("timelinecolor");
                      $(".audio-pause").css({
                         "display": "block"
                      });
					  $(this).addClass("added");
                      $(".sectiontitle:first").addClass("activer");
                      $(".audio-pause").addClass("block");
                      $(".audio-pause").show();
                      var previous_sec=0;
                      previous_sec=frame-1;
                      $(".framenames").hide();
                      $(".sectionnames").hide();
					  $("#f"+frame).show();
					  $("#f"+frame).prevAll().hide();
					  $("#f"+frame).nextAll().hide();
                       $("#fn"+frame).show();
                        $("#sn"+frame).show();
                         //$("#fn"+frame).addClass("Tactive");
                         // $("#sn"+frame).addClass("Tactive");
                       
                      $("#audio-slideshow").attr("data-audio", "audio/f" + frame + ".mp3");
                      $("audio").attr("src", "audio/f" + frame + ".mp3");
                      $('.removeall_exceptlast:not(:first)').remove();
                      $("#jquery_jplayer_2").jPlayer("play");
                      $("#toc" + frame).css({
                          "color": "#000"
                      });
                       $("#responsive-icon").html("<img src='images/responsive-icon.png' />");
                      $(".nis_frame_tabMode").hide();
                      $(".tableof_content").hide();
                      $(".toc_close").hide();
                      num = frame;
                      // screen level
                       $(".getFramenumber").val(frame);
                     
                      $(".pageloader-box").fadeIn();
                      var tocFrames = "page" + (frame) + ".html";
                      $(".nis_frame_emod").load(tocFrames, function(response, status, xhr) {
                           
                          send();
                          $(".frameno").html(frame+'/');
                          //chapterViewed(frame);
                          if (status == "error") {
                              var msg = "Sorry no page found ";
                              alert(msg + xhr.status + " " + xhr.statusText);
                              setTimeout(function(){ $(".pageloader-box").fadeIn(); }, 1000);
                              location.reload();
                          }
    if(status == "success")
                          {
                       // $(".pageloader-box").fadeOut();   
                              setTimeout(function(){ $(".pageloader-box").fadeOut(); }, 1000);
                          }


                      });

                  });
                  var $list = $('.toclist li');
                  var totalframes = $list.length;
                  //total frames//
                  $(".totalfrm").html(5);
                  //$(".totalfrm").html(totalframes);
                  
                 // console.log(frame);
                  //initBookmarkData(totalframes,frame);



              });
          }
      });
      //Glossary


      $('.loadxml').click(function() {
          $.ajax({
              type: 'get',
              url: 'transcript/glossary.xml',
              beforeSend: function() {
                  // before send the request, displays a "Loading..." messaj in the element where the response will be placed
                  //$('#resourceloader').html('Loading...');
              },
              timeout: 10000, // sets timeout for the request (10 seconds)
              error: function(xhr, status, error) {
                  alert('Error: ' + xhr.status + ' - ' + error);
              }, // alert a message in case of error
              dataType: 'xml',
              success: function(response) {
                  // $('#resourceloader').html('');        // removes the "loading..." notification from "#resp"

                  // gets and parse each child element in <webpages>
                  $(response).find('glossary').children().each(function() {
                      // gets the "id", "title", and "url" of current child element
                      var elm = $(this);
                      var gid = elm.attr('id');
                      var title = elm.find('title').text();
                      var paragraph = elm.find('paragraph').text();
                      // displays data
                      $('.loadlink').fadeIn().append('<tr class="loadlink'+gid+'"><td><a href="#" class="waves-effect gid' + gid + '">' + title + '</a></td></tr>');
                      $(".loadlink7").nextAll().remove();
                      $(".gid" + gid).bind("click", function() {
                         $('.loadlink a').removeClass('branding-active-text');
    $(this).addClass('branding-active-text');
                          $('.loadglossary').fadeIn().html('<tr class=" animated fadeIn rowloader' + gid + '"><td class="loadtitle"><div class="loadtitle' + gid + '">' + title + '</div></td><td class="load_def"><div class="load_def">' + paragraph + '</div></td></tr>');

                      });

                  });
              }
          });
      });
      //End of glossary
      //Resources here
      $('#resources').click(function() {
          $.ajax({
              type: 'get',
              url: 'transcript/resource.xml',
              beforeSend: function() {
                  // before send the request, displays a "Loading..." messaj in the element where the response will be placed
                  $('#resourceloader').html('Loading...');
              },
              timeout: 10000, // sets timeout for the request (10 seconds)
              error: function(xhr, status, error) {
                  alert('Error: ' + xhr.status + ' - ' + error);
              }, // alert a message in case of error
              dataType: 'xml',
              success: function(response) {
                  $('#resourceloader').html(''); // removes the "loading..." notification from "#resp"

                  // gets and parse each child element in <webpages>
                  $(response).find('resources').children().each(function() {
                      // gets the "id", "title", and "url" of current child element
                      var elm = $(this);
                      var rid = elm.attr('id');
                      var pdf = elm.find('pdf').text();
                      var ppt = elm.find('ppt').text();
                      //$(".close_resources").show();
                      //$('#resources').attr('href',pdf);
                       $(".audio-pause").addClass("hide");
                  });
              }
          });
      });
      //$(".close_resources").bind("click", function() {
          
       //   $(this).hide();
          //$(".audio-pause").show();
     // });
      //End of resources
  });

  (function($) {

      $.fn.udSynch = function(options) {

          var settings = {
              jPlayerPath: "/lib/swf",
              suppliedFileType: "mp3",
              playSelector: ".audio-play",
              playSelector_mone: ".audio-play_1",
              pauseSelector: ".audio-pause",
              nextSelector: ".jp-next",
              replaySelector: ".replay-audio",
              prevSelector: ".jp-previous",
              stopSelector: ".jp-stop",
              muteSelector: ".jp-mute",
              unmuteSelector: ".jp-unmute",
              currentTimeSelector: ".play-time",
              durationSelector: ".total-time",
              playheadSelector: ".playhead",
              timelineSelector: ".timeline",
              volumemaxSelector: ".jp-volume-bar",
              volumemaxvalueSelector: ".jp-volume-bar-value",
              tocSelector: ".tocredirect",
							playheadcircleSelector: ".circle-playhead",
							animationleft:".animationleft",
							animationright:".animationright",
							animationtoptobottom:".toptobottom",
							animationbottomtotop:".bottomtotop"

          };

          if (options) {
              jQuery.extend(settings, options);
          }

          // Begin to iterate over the jQuery collection that the method was called on
          return this.each(function() {

              // Cache `this`
              var $that = $(this)
              $slides = $that.find('.audio-slides').children(),

                  $currentTime = $that.find(settings.currentTimeSelector),
                  $duration = $that.find(settings.durationSelector),
                  $playhead = $that.find(settings.playheadSelector),
                  $timeline = $that.find(settings.timelineSelector),
                  $playButton = $that.find(settings.playSelector),
                  $nextButton = $that.find(settings.nextSelector),
                  $play_Mone = $that.find(settings.playSelector_mone),
                  $prevButton = $that.find(settings.prevSelector),
                  $replayButton = $that.find(settings.replaySelector),
                  $pauseButton = $that.find(settings.pauseSelector),
                  $stopbutton = $that.find(settings.stopSelector),
                  $mutebutton = $that.find(settings.muteSelector),
                  $unmutebutton = $that.find(settings.unmuteSelector),
                  $volumemaxbutton = $that.find(settings.volumemaxSelector),
                  $volumemaxvalue = $that.find(settings.volumemaxvalueSelector),
                  $tocButton = $that.find(settings.tocSelector),
									$circleplayhead=$that.find(settings.playheadcircleSelector),
									$animationleft=$that.find(settings.animationleft),
                  slidesCount = $slides.length,
                  slideTimes = new Array(),
                  audioDurationinSeconds = parseInt($that.attr('data-audio-duration')),
                  isPlaying = false,
                  currentSlide = -1;

              $pauseButton.hide();

              // Setup slides			
              $slides.each(function(index, el) {
                  var $el = $(el);
                  $el.hide();
                  var second = parseInt($el.attr('data-slide-time')),
                      thumbnail = $el.attr('id',"indexval"+second);
					 console.log(second);
                  if (index > 0) {
                      slideTimes.push(second);

                      var sliderdiv = '<div><div ' + thumbnail + '></div>',
                          $marker = $('<a href="javascript:;" class="marker" data-time="' + second + '">' + sliderdiv + '</a>'),
                          l = (second / audioDurationinSeconds) * $that.width();
                      $marker.css('left', l).click(function(e) {
                          $jPlayerObj.jPlayer("play", parseInt($(this).attr('data-time')) + .5);
                      });

                      $timeline.append($marker);
					 
                  }
              });

              var $jPlayerObj = $('<div id="jquery_jplayer_2" class="removeall_exceptlast"></div>');

              $that.append($jPlayerObj);

              $jPlayerObj.jPlayer({
                  ready: function() {

                      $.jPlayer.timeFormat.padMin = false;
                      $(this).jPlayer("setMedia", {
                          mp3: $that.attr('data-audio')
                      });
                  },

                  swfPath: settings.jPlayerPath,
                  supplied: settings.suppliedFileType,
                  preload: 'auto',
                  cssSelectorAncestor: "#jp_container_2",
                  ended: function() {
                      $(".nextFrame").show();
                      
                      $.jPlayer.pause();
                      $(".audio-pause").removeClass("block");
                      $(".timeline").addClass("timelinecolor");
                      $(".play-time").text("0:00");
                  }

              });


              $jPlayerObj.bind($.jPlayer.event.timeupdate, function(event) { // Add a listener to report the time play began
                  var curTime = event.jPlayer.status.currentTime;
                  audioDurationinSeconds = event.jPlayer.status.duration;
                  var p = (curTime / audioDurationinSeconds) * 100 + "%";
                  $currentTime.text($.jPlayer.convertTime(curTime));
                  $duration.text($.jPlayer.convertTime(audioDurationinSeconds));
                 //console.log("current time"+curTime);
                  $playhead.width(p);
                  console.log(p*30);
					$pauseButton.click(function(event) {
                  exportRoot.gotoAndStop(p*30);
                        
                    });
                  $play_Mone.click(function(event) {
                  exportRoot.gotoAndPlay(p*30);
                      var playerhead= $(".playhead").width();
          var timelinewidth =  $(".timeline").width();
                    });
                    $("#open_help").bind("click", function() {
                  $(".helpindex").show();
                  $jPlayerObj.jPlayer("pause");
                  $(".close_resources").hide();
              $("#resourceloader").hide();
                  $(".audio-pause").removeClass("block");
                        exportRoot.gotoAndStop(p*30);
              });
                  //$circleplayhead.css({"left":p});
                  $(".close_help").bind("click", function() {
                  $('.removeall_exceptlast:not(:first)').remove();
                     $(".helpindex").hide();
                  $(".close_resources").hide();
                  $(".audio-pause").show();
                  var playerhead= $(".playhead").width();
                  var timelinewidth =  $(".timeline").width();
              $("#resourceloader").hide();
                    if(playerhead == timelinewidth)
             {
             $("#jquery_jplayer_2").jPlayer("pause");
                 $(".audio-pause").hide();
                 exportRoot.gotoAndStop(p*30); 
             }
       else if(($(".timeline").hasClass("timelinecolor"))){
             $("#jquery_jplayer_2").jPlayer("pause");
           $(".audio-pause").hide();
           exportRoot.gotoAndStop(p*30); 
                           }
            else{
                $("#jquery_jplayer_2").jPlayer("play");
           $(".audio-pause").show();
                exportRoot.gotoAndPlay(p*30); 
            }
                
              });
                  
                  
                  if (slidesCount) {
                      var nxtSlide = 0;
                      for (var i = 0; i < slidesCount; i++) {
                          if (slideTimes[i] < curTime) {
                              nxtSlide = i + 1;
                          
                             $("#indexval"+slideTimes[i]).prev().addClass("block");
                             $("#indexval"+slideTimes[i]).last().addClass("block");
                              // $("#indexval"+slideTimes[i]).addClass("animated");
                              $("#indexval"+slideTimes[i]).parent().prev().addClass("hide");
                              $("#indexval"+slideTimes[i]).parent().attr('id','audio'+i);
                              $(".show-previous").prev().addClass("block");
						      
                          }
                           
                      }
                     
                    // console.log(slideTimes);
                      setAudioSlide(nxtSlide);
                       
                  }
              });

              $jPlayerObj.bind($.jPlayer.event.play, function(event) { // Add a listener to report the time play began
                  isPlaying = true;
                  $playButton.hide();
                  $pauseButton.show();
                  $play_Mone.hide();


              });

              $jPlayerObj.bind($.jPlayer.event.pause, function(event) { // Add a listener to report the time pause began
                  isPlaying = false;
                  $pauseButton.hide();
                  $playButton.show();
                  $play_Mone.show();
                  
              });

              $slides.click(function(event) {
                  $('.removeall_exceptlast:not(:first)').remove();
                  $jPlayerObj.jPlayer("play");

              });

              //var host = location.hostname;
              // var pathname = location.pathname;	
               $replayButton.click(function(){
                   setTimeout(function(){
                   $jPlayerObj.jPlayer("stop");
                                            $(".audio-slides").children().removeClass("block");
                $(".audio-slides").children().removeClass("hide");
                $(".audio-slides").removeClass("hide");
                   },300);
                  
                    setTimeout(function(){ $jPlayerObj.jPlayer("play");
                                          $jPlayerObj.jPlayer("unmute");
                                          $(".timeline").removeClass("timelinecolor");
                        }, 400);
                  $(".tabs").removeClass("activex_1");
                   $(".tabs").removeClass("activex_2");
                    $(".tabs").removeClass("activex_3");
                     $(".tabs").removeClass("activex_4");
                      $(".tabs").removeClass("activex_5");
                       $(".tabs").removeClass("activex_6");
                       $(".data").hide();
                  $('.removeall_exceptlast:not(:first)').remove();
                exportRoot.gotoAndPlay(0);
               });
        
            

            
              $("#resources").bind("click", function() {
                  $jPlayerObj.jPlayer("pause");
                  $(".audio-pause").hide();
                  $(".audio-play_1").hide();
              });
              $(".close_resources").bind("click", function() {
                  $(this).hide();
                  $('.removeall_exceptlast:not(:first)').remove();
                   var playerhead= $(".playhead").width();
                    var timelinewidth =  $(".timeline").width();
                  $("#resourceloader").hide();
                  if(playerhead == timelinewidth)
             {
             $("#jquery_jplayer_2").jPlayer("pause");
                 $(".audio-pause").hide();
             }
       else if(($(".timeline").hasClass("timelinecolor"))){
             $("#jquery_jplayer_2").jPlayer("pause");
           $(".audio-pause").hide();
                           }
            else{
                $("#jquery_jplayer_2").jPlayer("play");
           $(".audio-pause").show();
            }

              });
              $(".loadxml").bind("click", function() {
                  $jPlayerObj.jPlayer("pause");
                  $(".audio-pause").removeClass("block");
              });
              $(".modal-close").bind("click", function() {
                  $(".close_resources").hide();
              $("#resourceloader").hide();
                  var playerhead= $(".playhead").width();
          var timelinewidth =  $(".timeline").width();
                  if(playerhead == timelinewidth)
             {
             $("#jquery_jplayer_2").jPlayer("pause");
                 $(".audio-pause").hide();
             }
       else if(($(".timeline").hasClass("timelinecolor"))){
             $("#jquery_jplayer_2").jPlayer("pause");
           $(".audio-pause").hide();
                           }
            else{
                $("#jquery_jplayer_2").jPlayer("play");
           $(".audio-pause").show();
            }

              });
              /*$(".audiotranscriptor").bind("click", function() {
                  $jPlayerObj.jPlayer("pause");

              });*/
              /*$(".close_transcript").bind("click", function() {
                  $('.removeall_exceptlast:not(:first)').remove();
                  $jPlayerObj.jPlayer("play");
              });*/
              $playButton.click(function(event) {
                  $(".disclaimer").show();
                  $(".page10").off("click");
                  $(".page13").off("click");
                  $(".brand-logo").show();
                  $(".information-icon").show();
               $(".tableof_tab").show();
                  $(".switch > label").removeClass("white-text");
                  $(".timeline").removeClass("timelinecolor");
                $(".audio-pause").addClass("block");
                  $(".sectiontitle:first").addClass("activer");
                  $(".replay-audio").show();
                  $volumemaxbutton.show();
                  $mutebutton.show();
                  $unmutebutton.show();
                  $volumemaxvalue.show();
                  $(".contain_image").css({"bottom":"59px"});
                  $(".audio-play_1").show();
                  $(this).hide();
                  $jPlayerObj.jPlayer("play");
                  $(".jp-mute").show();
                  $(".audio-pause").show();	
                   $(".jp-mute").css({"z-index":"6"});
                  $(".getFramenumber").val(num);
                  //console.log(trackframes);
                 // send();
                  // Enable buttons //
                  $(".replay-audio").show();
        $(".jp-previous").show();
        $(".jp-next").show();
        $(".jp-mute").removeClass("hide");
        $(".jp-unmute").removeClass("hide");
        $(".audio-play_1").show();
        $(".timeline").show();
        $(".switch").show();
        $(".transcript_icon").show();
        $(".frametext").show();
        $(".nav-wrapper").show()
        $(".audio-control-interface").css({"bottom":"13px"});        
        $(".time-container").show();
        //End of enabling button//
             
                  init();
                showbookmarkpopup('cmi.core.lesson_location'); 
                   
                  $(".nis_frame_emod").load("page1.html", function() {	
             
                      $(".counter").text(num);
                      $('.removeall_exceptlast:not(:first)').remove();
                      $("#f1").show();
                      $("#fn1").show();
                      $("#sn1").show();
                      $(".frameno").html('1/');
                      $("#toc" + num).css({
                          "color": "#000"
                      });
                     
                  
                        
                  });

                  $nextButton.bind("click", function(event) {
                   
                      $(".timeline").removeClass("timelinecolor");
                      $jPlayerObj.jPlayer("unmute");
				      $playButton.hide();						
                      $volumemaxbutton.show();
                      $mutebutton.show();
                      //$unmutebutton.show();
                      $volumemaxvalue.show();
                      num++;
                       $(".getFramenumber").val(num);
                      
                     
                      //console.log(trackframes);
                      var nextFrame = "page" + (num) + ".html";
                      console.log(nextFrame);
                      $("#audio-slideshow").attr("data-audio", "audio/f" + num + ".mp3");
                      $("audio").attr("src", "audio/f" + num + ".mp3");
                      $("#jquery_jplayer_2").jPlayer("play");
	                   $(".pageloader-box").fadeIn();
                      $(".nis_frame_emod").load(nextFrame, function(response, status, xhr) {
                          //chapterViewed(num);
                          
                          send(); 
                    /*  if(((totalframe_tracker.length) == num))
                      {
                          complete(); return false;
                      }*/
                   
                          $(".counter").text(num);
                          if (status == "error") {
                              var msg = "Sorry no page found ";
                              //$(".jp-next").prop("disabled",true);
                              alert(msg + xhr.status + " " + xhr.statusText);
                              location.reload();
                               // setTimeout(function(){ $(".pageloader-box").fadeIn(); }, 1000);
                                setTimeout(function(){ $(".pageloader-box").fadeIn(); }, 1000);
                              
                          }
						  if(status == "success")
                          {
                        //$(".pageloader-box").fadeOut();  
                               //setTimeout(function(){ $(".pageloader-box").fadeIn(); }, 3000);
                                setTimeout(function(){ $(".pageloader-box").fadeOut(); }, 1000);
                          }
                          $(".nis_frame_tabMode").empty();
                          $("#audio-slideshow").attr("data-audio", "audio/f" + num + ".mp3");
                          $('.removeall_exceptlast:not(:first)').remove();
                          $(".audio-pause").fadeIn();
                          $(".audio-play").hide();
                          $(".page" + num + "_content").fadeIn();
                          $(".transcript_loader").hide();
                          $(".audiotranscriptor").fadeIn();
                          $(".close_transcript").fadeOut();
                          $('.transcriptor').fadeOut();
                          $('.transcriptor').fadeOut();
                          $("#f" + num).show();
                          $("#fn" + num).show();
                          $("#sn" + num).show();
                          var subtract = num - 1;
                          $("#f" + subtract).hide();
                          $("#fn" + subtract).hide();
                          $("#sn" + subtract).hide();
                          $(".frameno").html(num + "/");
                          $(".nextFrame").hide();
                          $("#toc" + num).css({
                              "color": "#000"
                          });
                          $(".tableof_content").hide();
                          //chapterViewed(num);
                           



                      });
                  });
                  $(".launch").hide();
                  $(".audio-pause").show();
                  $(".audio-play").css({"z-index":"-6"});
                  $(".launchbox").css({
                      "display": "none"
                  });
                  $(this).css({
                      "background": "url(../images/play_change.png)"
                  });
                  $(this).css({
                      "background-repeat": "no-repeat"
                  });
                  $(this).css({
                      "background-position": "center"
                  });
                
                  $pauseButton.css({
                      "background-repeat": "no-repeat"
                  });
                  $pauseButton.css({
                      "background-position": "center"
                  });
                  $pauseButton.css({
                      "width": "35px"
                  });
                  $pauseButton.css({
                      "height": "35px"
                  });
                
                  
                  $stopbutton.show();
                  $prevButton.bind("click", function(event) {
                     
                      $(".timeline").removeClass("timelinecolor");
                      $jPlayerObj.jPlayer("unmute");
                      $volumemaxbutton.show();
                      $mutebutton.show();
                      //$unmutebutton.show();
                      $volumemaxvalue.show();
                      $jPlayerObj.jPlayer("play");
                      $(".audio-pause").fadeIn();
                      $(".audio-play").hide();
                      num--;
                       $(".getFramenumber").val(num);
                       send();
                      $("#audio-slideshow").attr("data-audio", "audio/f" + num + ".mp3");
                      $("audio").attr("src", "audio/f" + num + ".mp3");
                      $("#jquery_jplayer_2").jPlayer("play");
                      var prevFrame = "page" + (num) + ".html";
                      console.log(prevFrame);
                      $(".pageloader-box").fadeIn();
                      $(".nis_frame_emod").load(prevFrame, function(response, status, xhr) {
                          $(".counter").text(num);
                         // chapterViewed(num);
                          if (status == "error") {
                              var msg = "Sorry no page found ";
                              alert(msg + xhr.status + " " + xhr.statusText);
                              location.reload();
                              //$(".pageloader-box").fadeOut();  
                               setTimeout(function(){ $(".pageloader-box").fadeIn(); }, 1000);
                               // setTimeout(function(){ $(".pageloader-box").fadeOut(); }, 4000);
                          }
                           if(status == "success")
                          {
                        //$(".pageloader-box").fadeOut();     
                              // setTimeout(function(){ $(".pageloader-box").fadeIn(); }, 3000);
                                setTimeout(function(){ $(".pageloader-box").fadeOut(); }, 1000);
                          }
                          $(".nis_frame_tabMode").empty();
                          $(".page_content").addClass("page" + num + "_content");
                          $(".title").addClass("title" + num);
                          $(".paragraph").addClass("paragraph" + num);
                          $(".bullets").addClass("bullets" + num);
                          $(".transcript_box").hide();
                          $(".audiotran_text").empty();
                          $('.button_maximizetranscript').html('<i class="tiny material-icons top_lineheight" id="au_id' + num + '">speaker_notes</i>');
                          $("#audio-slideshow").attr("data-audio", "audio/f" + num + ".mp3");
                          $('.removeall_exceptlast:not(:first)').remove();
                          $(".audio-pause").fadeIn();
                          $(".audio-play").hide();
                          $(".page" + num + "_content").fadeIn();
                          $(".transcript_loader").hide();
                          $(".audiotranscriptor").fadeIn();
                          $(".close_transcript").fadeOut();
                          $('.transcriptor').fadeOut();
                          $("#f" + num).show();
                          $("#fn" + num).show();
                          $("#sn" + num).show();
                          var adder = num + 1;
                          $("#f" + adder).hide();
                          $("#fn" + adder).hide();
                          $("#sn" + adder).hide();
                          $(".frameno").html(num + "/");
                          $(".nextFrame").hide();
                          $(".tableof_content").hide();
                           

                      });


                  });


              });


              $volumemaxbutton.click(function(event) {
                  var l = event.pageX - $(this).offset().left;
                  var t = (l / $that.width()) * audioDurationinSeconds;


              });
              $mutebutton.click(function() {
                  $mutebutton.css({
                      "display": "none !important"
                  });
                   $jPlayerObj.jPlayer("mute");
              });
                $unmutebutton.click(function() {
                  $unmutebutton.css({
                      "display": "none !important"
                  });
                   $jPlayerObj.jPlayer("unmute");
              });
              $pauseButton.click(function(event) {
                 $jPlayerObj.jPlayer("pause");
                  $(".audio-pause").hide();
                  $(".audio-play").fadeIn();
                  $playButton.css({
                      "left": "20rem"
                  });
                  $(".audio-play").css({ "left": "20rem"});
                $pauseButton.removeClass("block");
              });
              $play_Mone.click(function(event) {
                 
                  $(".timeline").removeClass("timelinecolor");
                  $jPlayerObj.jPlayer("play");
                $(".audio-slides").children().removeClass("block");
                $(".audio-slides").removeClass("hide");
                   $('.removeall_exceptlast:not(:first)').remove();
              });
              $stopbutton.click(function(event) {
                  $jPlayerObj.jPlayer("stop");
                  $(this).css({
                      "background-repeat": "no-repeat"
                  });
                  $(this).css({
                      "background-position": "center"
                  });
                  $(this).css({
                      "width": "33px"
                  });
                  $(this).css({
                      "height": "33px"
                  });
                  $(this).css({
                      "left": "8.5rem"
                  });
                  $(this).css({
                      "top": "11rem"
                  });
              });



              $timeline.click(function(event) {
                  var l = event.pageX - $(this).offset().left;
                  var t = (l / $that.width()) * audioDurationinSeconds;
                  console.log("data"+t);
                  $('.removeall_exceptlast:not(:first)').remove();
                  $jPlayerObj.jPlayer("play", t);
                  $(".audio-slides").children().removeClass("block");
                   //$(".audio-slides").children().addClass("hide");
				   $(".audio-slides").removeClass("hide");
				   $(".row").removeClass("hide");
               $(".timeline").removeClass("timelinecolor");
               exportRoot.gotoAndPlay(t*30);
                  console.log("timeline"+t);
              });
              //Tab event


              //Tab event ends
              setAudioSlide(0);

              function setAudioSlide(n) {
				 
                  if (n != currentSlide) {
                      if ($slides.get(currentSlide)) {
					   $($slides.get(currentSlide)).hide();
				      
                        
                      }

                      $($slides.get(n)).fadeIn();
                      $($slides.get(n)).addClass("block");
                      $($slides.get(n)).removeClass("hide");
                      //$($slides.get(n)).addClass("animated");
                     // $(".course-name").addClass("animated");
               
                      currentSlide = n;
                     
					
                  }
				  

              }

          });
      };
  }(jQuery));

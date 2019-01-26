//PLAYER
var audio;

$.ajax({
  type: "GET",
  url: "js/songs.json",
  dataType: "json",
  success: function(records){
    $.each(records, function(i, record){
      $("#playlist").append("<li song='" + record.song + "' cover='" + record.cover + "' artist='" + record.artist + "'>" + record.track + record.title + " - " + record.artist +  ".<br />Album: " + record.album + "</li>");

      // $('#audio-player .title').append("<span>" + record.track + record.artist +  "<br/>Album Title: " + record.album + "</span>");
    });

    $('#pause').hide();

    initAudio($('#playlist li:first-child'));

    // var zeroTime = 0.00;

    function initAudio(element){
      var song = element.attr('song');
      var title = element.text();
      var cover = element.attr('cover');
      var artist = element.attr('artist');

      audio = new Audio('songs/' + song);

      if(!audio.currentTime){
        $('#duration').html('0.00');
        $('#duration2').html('0.00');
      }

      $('#audio-player .title').text(title);

      $('img.cover').attr('src','img/coverArt/' + cover);

      $('#playlist li').removeClass('active');
        element.addClass('active');
    }


    $('#play').click(function(){
      audio.play();
      $('#play').hide();
      $('#pause').show();
      $('#duration').fadeIn(400);
      $('#duration2').fadeIn(400);
      showDuration();
    });

    $('#pause').click(function(){
      audio.pause();
      $('#pause').hide();
      $('#play').show();
    });



    // var slideTrue;
    //
    // $("#progress").on("mousedown", function(e){
    // 	slideTrue = true;
    // 	setMusic(e);
    // });
    //
    // $("#progress").on("mousedown", function(e){
    //
    // 	setMusic(e);
    // });
    //
    // $("#progress").on("mousedown", function(e){
    // 	slideTrue = false;
    // });
    //
    // var setMusic = function(e){
    // 	if(slideTrue){
    // 		var positionMusic = audio.duration * ($("#progress").value / 100);
    // 		audio.currentTime = positionMusic;
    // 	}
    // };



  // 	$('#next').mousedown(function(){
  // 		audio.playbackRate = 2;
  // 	});
  //
  // 	if(audio.playbackRate == 1 && audio.currentTime == 0){
  // 		$('#next').mouseup(function(){
  // 			var currentTime = audio.currentTime;
  // 	    audio.currentTime = (currentTime >= 3.0) ? currentTime - 3.0 : 0;
  // 			audio.playbackRate = 1;
  // 		});
  // }
  //
  // else if(audio.playbackRate == 1 && audio.currentTime != 0){
  // 	$('#next').click(function(){
  // 	    audio.pause();
  // 			$('#pause').show();
  // 			$('#play').hide();
  // 			$("#audio-image").css("opacity", "0");
  // 			$("#audio-image").stop().animate({"opacity": "1"}, 500);
  //
  // 	    var next = $('#playlist li.active').next();
  //
  // 	    if (next.length == 0){
  // 	        next = $('#playlist li:first-child');
  // 	    }
  //
  // 	    initAudio(next);
  // 			audio.play();
  // 			showDuration();
  // 	});
  // }


  $('#next').click(function(){
      audio.pause();
      $('#pause').show();
      $('#play').hide();
      $("#audio-image").css("opacity", "0");
      $("#audio-image").stop().animate({"opacity": "1"}, 500);

      var next = $('#playlist li.active').next();

      if (next.length == 0){
          next = $('#playlist li:first-child');
      }

      initAudio(next);
      audio.play();
      showDuration();
  });

    $('#prev').click(function(){
        audio.pause();
        $('#pause').show();
        $('#play').hide();
        $("#audio-image").css("opacity", "0");
        $("#audio-image").stop().animate({"opacity": "1"}, 500);

        var prev = $('#playlist li.active').prev();

        if (prev.length == 0){
            prev = $('#playlist li:last-child');
        }

        initAudio(prev);
        audio.play();
        showDuration();
    });

    // $('#prev').mousedown(function(){
    //   audio.pause();
    //   intervalo = setInterval(function(){
    //       audio.currentTime += 5;
    //   }, 1000);
    // })
    // .mouseup(function(){
    // 	clearInterval(intervalo);
    //   audio.play();
    // });

    $('#playlist li').click(function (){
        audio.pause();
        initAudio($(this));
      $('#play').hide();
      $('#pause').show();
      $('#duration').fadeIn(400);
      $('#duration2').fadeIn(400);
      $("#audio-image").css("opacity", "0");
      $("#audio-image").stop().animate({"opacity": "1"}, 500);
      audio.play();
      showDuration();
    });

    $('#volume').change(function(){
      audio.volume = parseFloat(this.value / 10);
    });

    function showDuration(){
      audio.addEventListener("timeupdate", function(){
        var position = audio.currentTime / audio.duration;
        $('#progress').css('width', position * 100 + '%');
      });

      $(audio).bind('timeupdate', function(){
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt((audio.currentTime / 60) % 60);

        var s2 = parseInt(audio.duration % 60);
        var m2 = parseInt((audio.duration / 60) % 60);

        if (s < 10){
          s = '0' + s;
        }

        if (s2 < 10){
          s2 = '0' + s2;
        }

        $('#duration').html(m + '.' + s);

        if(audio.currentTime >= audio.duration){
          $('#next').trigger("click");
          // $('#duration2').html(zeroTime);
        }

        if(audio.currentTime < audio.duration){
          $('#duration2').html(m2 + '.' + s2);
        }
        // var value = 0;
        // if (audio.currentTime > 0){
        // 	value = Math.floor((100 / audio.duration) * audio.currentTime);
        // }
        // $('#progress').css('width', value + '%');
      });
    }
  }
});

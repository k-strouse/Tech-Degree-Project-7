var video = document.getElementById('video');
var fastFwd = document.getElementById('fastFwd');
var videoWrapper = document.getElementById('videoWrapper');
var progressBar = document.getElementById('progressBar');
var $video = $("#video");
var progress = document.getElementById('progress');
var $btnControls = $('#btnControls');
var $vidWrapper2 = $('#vidWrapper2');
var $videoWrapper = $('#videoWrapper');
var $playerControls = $('#playerControls');
var $progressBar = $('#progressBar');
var $track = $('#track');
var $progress = $('#progress');
var	captionBtn = document.getElementById("captionBtn");
var $slider = $('#slider');

//Play/Pause button

$('.play_pause').on('click', function() {
	if($video[0].paused) {
		$video[0].play();
		$('.playBtn').show();
		$('.pauseBtn').hide();
	}
	else {
		$video[0].pause();
		$('.pauseBtn').show();
		$('.playBtn').hide();
	}
	return false;
});





//---------------Playback time-------------------------

//Current Time
setInterval(function(){
	var time = $video[0].currentTime;
	var minutes = Math.floor(time/60);
	var seconds = Math.floor(time - minutes * 60);
	var x = minutes < 10 ? "0" + minutes : minutes;
	var y = seconds < 10 ? "0" + seconds : seconds;
	document.getElementById('time').innerHTML = x + ":" + y + " /";
}, 1000);



//Duration
var duration = function() {
	var time = $video[0].duration;
	var minutes = Math.floor(time/60);
	var seconds = Math.floor(time - minutes * 60);
	var y = seconds < 10 ? "0" + seconds : seconds;
	document.getElementById('time').innerHTML = x + ":" +y;
};

//---------------Change playback speed--------------------------------
function changeSpeed() {
	if($video[0].playbackRate === 1) {
		$video[0].playbackRate = 2;
		fastFwd.innerHTML = "2x Speed";
	} else if ($video[0].playbackRate === 2) {
		$video[0].playbackRate = 1;
		fastFwd.innerHTML ="1x Speed";				
	}
};

$('#fastFwd').on('click', function() {
	changeSpeed();
});


//---------------Volume--------------------------------

document.getElementById('volume').addEventListener('click', function() {
	if ($video[0].muted) {
		$video[0].muted = false;
		$('#soundOff').show();
		$('#soundOn').hide();
	} else {
		$video[0].muted = true;
		$('#soundOn').show();
		$('#soundOff').hide();
	}
	false;
});

$slider.on("change", function(){ 
	$video[0].volume = $slider[0].value;
});

//---------------Full Screen--------------------------------
document.getElementById('fullBtn').addEventListener('click', function() {
	if ($video[0].requestFullScreen) {
		$video[0].requestFullScreen();
	} else if ($video[0].mozRequestFullScreen) {
		$video[0].mozRequestFullScreen();
	} else if ($video[0].webkitRequestFullScreen) {
		$video[0].webkitRequestFullScreen();
	}
});



//---------------Captions--------------------------------

video.textTracks[0].mode = 'showing';

function hideTracks() {
	var video = document.getElementById('video');
	for (i = 0; i < video.textTracks.length; i++) {
		video.textTracks[0].mode = "hidden";
	}
};
		
	
document.getElementById("captionBtn").addEventListener("click", function() {
		if (video.textTracks[0].mode == 'hidden') {
			hideTracks();
			track = document.createElement("track");
			track.kind = "captions";
			track.label = "English";
			track.srclang = "en";
			track.src = "vid/captions.vtt";
			video.appendChild(track); 
			track.addEventListener("load", function() {
				this.mode = "showing";
				video.textTracks[0].mode = "showing";
			});
			console.log('==showing')
		} else if (video.textTracks[0].mode = 'showing') {
				hideTracks();
				console.log('==hidden')
			}
	});










//---------------Progress Bar--------------------------------
video.addEventListener('timeupdate', updateProgressBar, false);
function updateProgressBar() {
	var percentage = Math.floor((100/this.duration) * this.currentTime);
	progressBar.value = percentage;
	progressBar.innerHTML = percentage + '% Played';
}

function resetPlayer() {
	progressBar.value = 0;
	video.currentTime = 0;
}

progressBar.addEventListener("change", function() {
	var time = video.duration * (progressBar.value / 100);
	video.currentTime = time;
});

video.addEventListener("timeupdate", function() { 
	var value = Math.floor((100 / this.duration) * this.currentTime);
	$('#progress').css("width", value+"%");
	$('#progress').css('display', 'block', '!important');	
});




//---------------Video Transcript--------------------------------

	$video.on("timeupdate", function() {
		var $videoTime = $video[0].currentTime;
		function addHighlight(n) {
			$('span[data-time]').removeClass("highlight");
			$('span[data-time="' + n + '"]').addClass("highlight");
		}

			if ($videoTime > -1 && $videoTime < 4.130) {
				addHighlight(0);
			} else if ($videoTime > 4.13 && $videoTime < 7.535) {
				addHighlight(4.13);
			} else if ($videoTime > 7.535 && $videoTime < 11.27) {
				addHighlight(7.535);
			} else if ($videoTime > 11.27 && $videoTime < 13.96) {
				addHighlight(11.27);
			} else if ($videoTime > 13.96 && $videoTime < 17.94) {
				addHighlight(13.96);
			} else if ($videoTime > 17.94 && $videoTime < 22.37) {
				addHighlight(17.94);
			} else if ($videoTime > 22.37 && $videoTime < 26.88) {
				addHighlight(22.37);
			} else if ($videoTime > 26.88 && $videoTime < 30.92) {
				addHighlight(26.88);
			} else if ($videoTime > 32.1 && $videoTime < 34.73) {
				addHighlight(32.1);
			} else if ($videoTime > 34.73 && $videoTime < 39.43) {
				addHighlight(34.73 );
			} else if ($videoTime > 39.43 && $videoTime < 41.19) {
				addHighlight(39.43);
			} else if ($videoTime > 42.35 && $videoTime < 46.3) {
				addHighlight(42.35);
			} else if ($videoTime > 46.3 && $videoTime < 49.27) {
				addHighlight(46.3);
			} else if ($videoTime > 49.27 && $videoTime < 53.76) {
				addHighlight(49.27);
			} else if ($videoTime > 53.76 && $videoTime < 57.78 ) {
				addHighlight(53.76);
			} else if ($videoTime > 57.78) {
				addHighlight(57.78);
			}

	});

//---------------Video Transcript Click Function--------------------------------
$('span').click(function() {
	var transcriptTime = $(this).attr('data-time');
	$video[0].currentTime = transcriptTime;
});



//---------------Video Controls Hover States--------------------------------

$videoWrapper.on("mouseleave", function() {
	if($video[0].paused === false) {
		$btnControls.hide();
		$videoWrapper.css('padding-bottom', '35px');
		$progress.css('top', '38px'); 
		$progressBar.css('top', '31px'); 
	}
});

$videoWrapper.on("mouseover", function() {
		$btnControls.show();
		$videoWrapper.css('padding-bottom', '0');
		$progress.css('top', '-3px');
		$progressBar.css('top', '-10px'); 
});

if($video[0].currentTime == 0) {
	$progress.css('display', 'none');
} 











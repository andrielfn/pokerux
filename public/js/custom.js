var DEFAULT_BLINDS = [2, 4, 10, 20, 50, 100, 200, 400, 800, 1000, 2000, 4000];
var DEFAULT_TIMER = 600;
var DEFAULT_LEVEL = 1;
var DEFAULT_TIMER_STATUS = "paused"

$(document).ready(function(){
	
	// Set blinds by default
	if(getBlinds() == null){
		setBlinds(DEFAULT_BLINDS);
		setBigBlind(DEFAULT_BLINDS[0]);
	}

	// Set timer by default
	if(getTimer() == null)
		setTimer(DEFAULT_TIMER);

	if(getLevel() == null)
		setLevel(DEFAULT_LEVEL);
		
	if(getTimerStatus() == null)
		setTimerStatus(DEFAULT_TIMER_STATUS);

	// Print blind values on page
	printBlinds();

	$(".close-header").click(function(){
		closeHeader();
		return false;
	});
	
	$("#set-blinds :input[type='submit']").click(function(){
		setCustomBlinds();
		notify("Blinds saved.", "success");
		return false;
	});
	
	$("#set-timer :input[type='submit']").click(function(){
		setCustomTimer();
		notify("Timer saved.", "success");
		return false;
	});

	$('#timer').countdown({until: +getTimer(), onTick: everySecond, onExpiry: updateTimer});
	$('#timer').countdown('pause');
	
	fillBlindFields();
	fillTimerField();
});

function setCustomTimer(){
	setTimer($("#set-timer :input[type='text']").val() * 60);
}

function fillTimerField(){
	var minutes = parseInt(getTimer()) / 60;
	$("#set-timer :input[type='text']").val(minutes);
}

function setCustomBlinds(){
	var blinds = [];
	$("#set-blinds :input[type='text']").each(function(el) {
		blinds.push(parseInt($(this).val()));
	});
	setBlinds(blinds);
}

function fillBlindFields(){
	var blinds = getBlinds();
	$("#set-blinds :input[type='text']").each(function(el) {
		$(this).val(blinds[el]);
	});
}

function getBlinds(){
	if(localStorage.getItem("cfg_blinds") == null)
	return setBlinds(DEFAULT_BLINDS);
	else
	return localStorage.getItem("cfg_blinds").split(",");
}

function setBlinds(blinds){
	localStorage.setItem("cfg_blinds", blinds);
	return blinds;
}

function getBigBlind(){
	if(localStorage.getItem("big_blind") == null)
	return setBigBlind(DEFAULT_BLINDS[0]);
	else
	return localStorage.getItem("big_blind");
}

function setBigBlind(blind){
	// alert(blind);
	localStorage.setItem("big_blind", blind);
	return blind;
}

function getSmallBlind(){
	return getBigBlind() / 2;
}

function getTimer(){
	if(localStorage.getItem("cfg_timer") == null)
	return setTimer(DEFAULT_TIMER);
	else{
		return parseInt(localStorage.getItem("cfg_timer"));
	}
}

function setTimer(seconds){
	localStorage.setItem("cfg_timer", seconds);
	return seconds;
}

function setLevel(level){
	localStorage.setItem("current_level", level);
	return level;
}

function getLevel(){
	if(localStorage.getItem("current_level") == null){
		return setLevel(DEFAULT_LEVEL);
	}else{
		return parseInt(localStorage.getItem("current_level"));
	}
}

function setTimerStatus(status){
	localStorage.setItem("timer_status", status);
	return status;
}

function getTimerStatus(){
	if(localStorage.getItem("timer_status") == null){
		return setTimerStatus(DEFAULT_TIMER_STATUS);
	}else{
		return localStorage.getItem("timer_status");
	}
}

function everySecond(periods){
	if ($.countdown.periodsToSeconds(periods) == 5) { 
		$(this).addClass('red'); 
	}
	
	if (audio == null) {
		var audio = new Audio("/5seconds.mp3");
	}
	
	second = $.countdown.periodsToSeconds(periods)
	if (second <= 5 && second >= 2) {
		audio.play();
	}
}

function updateTimer(){
	setBigBlind(getBlinds()[getLevel()]);
	setLevel(getLevel() + 1);
	printBlinds();
	printLevel();
	$('#timer').removeClass('red').countdown('change', {until: +getTimer()});
}

function printBlinds(){
	var bigBlind = getBigBlind();
	var smallBlind = getSmallBlind();
	$("#blinds .small").html(smallBlind);
	$("#blinds .big").html(bigBlind);
}

function printLevel(){
	$(".level-number").html(getLevel());
}

function notify(message, class_name){
	$.notifyBar({
		html: message,
		delay: 2000,
		animationSpeed: "normal",
		cls: class_name
	});
}

function closeHeader(){
	$("header").slideToggle('medium');
	$(this).html("+");
}

// ################## KEYS ##################
$(window).keypress(function(e){
	switch(e.keyCode){
		case 32:
			pauseOrResumeTimer();
			return false;
		case 114:
			resetAll();
			return false;
		default:
			return true;
	}
});

function resetAll(){
	var sure = confirm("Are you sure?");
	if (!sure) { return false };
	$("#timer").countdown('change', {until: +getTimer()});
	$('#timer').countdown('pause');
	notify('Timer reseted. Press Space to start again.', "success")
	setBlinds(DEFAULT_BLINDS);
	setBigBlind(DEFAULT_BLINDS[0]);
	setTimer(DEFAULT_TIMER);
	setLevel(DEFAULT_LEVEL);
	setTimerStatus(DEFAULT_TIMER_STATUS);
	printBlinds();
	printLevel();
}

function pauseOrResumeTimer(){
	// closeHeader();
	if(getTimerStatus() == 'paused'){
		$('#timer').countdown('resume');
		setTimerStatus('running');
		notify('Timer started.', "success");
	}else{
		$('#timer').countdown('pause');
		setTimerStatus('paused');
		notify('Timer paused.', "success");
	}
}
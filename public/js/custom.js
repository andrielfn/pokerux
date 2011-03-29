$(document).ready(function(){
	
	$(document).ready(function(){
		if (localStorage.getItem("blinds") != null) {
			var blinds = localStorage.getItem("blinds").split(",");
			$("#set-blinds :input[type=text]").each(function(el){
				$(this).val(blinds[el]);
			});
		}else{
			// Set blinds by default
			var blinds = [2, 4, 10, 20, 50, 100, 200, 400, 800, 1000, 2000, 4000]
			localStorage.setItem("blinds", blinds);
		}
		
		if (localStorage.getItem("countdown") != null) {
			countdown = parseInt(localStorage.getItem("countdown"));
			var time = [];
			time[0] = Math.floor(countdown / 60);
			time[1] = countdown % 60;
			$("#set-countdown :input[type=text]").each(function(el){
				$(this).val(time[el]);
			});
			// alert(parseInt(localStorage.getItem("countdown")));
		}else{
			// Set countdown time per level
			var countdown = 600; // In seconds
			localStorage.setItem("countdown", countdown);
		}
	});
	
	$('#timer').countdown({until: +parseInt(localStorage.getItem("countdown")), compact: true, format: "MS", onTick: redOn5Seconds, onExpiry: updateData});
	
	
	// Set default values to inputs
	$("#set-default-blinds").click(function(){ 
		var blinds = [2, 4, 10, 20, 50, 100, 200, 400, 800, 1000, 2000, 4000]
		$("#set-blinds :input[type=text]").each(function(el){
			$(this).val(blinds[el]);
		});	
	});
	
	// Clear inputs
	$("#clear-default-blinds").click(function(){ 
		$("#set-blinds :input[type=text]").each(function(el){
			$(this).val("");
		});
	});
	
	// Save blinds values on local storage
	$("#set-blinds :input[type=submit]").click(function(){
		var blinds = new Array();
		var save = true;
		$("#set-blinds :input[type=text]").each(function(el){
			if ($(this).val() == "") {
				alert("Level " + (parseInt(el)+1) + " is blank.");
				save = false;
				return false;
			};
			blinds.push(parseInt($(this).val()));
		});
		if(save){
			localStorage.setItem("blinds", blinds);
		}
		return false;
	});
	
	// Save blinds values on local storage
	$("#set-countdown :input[type=submit]").click(function(){
		var save = true;
		var inputs = new Array();
		var countdown = 0;
		inputs = $("#set-countdown :input[type=text]");
		if(inputs[0].value != ""){
			countdown += parseInt(inputs[0].value) * 60;
		}
		if(inputs[1].value != ""){
			countdown += parseInt(inputs[1].value);
		}
		if(save){
			localStorage.setItem("countdown", countdown);
		}
		return false;
	});
	
	// ################## TEMP ##################
	$("#temp-test").click(function(){
	});
});

function redOn5Seconds(periods){
	if ($.countdown.periodsToSeconds(periods) == 5){
		$(this).addClass('red');
	}
}

function updateData(){
	// $("#sound").html("<embed src='/buzzer.wav' hidden=true autostart=true loop=false>");
	var blinds = localStorage.getItem("blinds").split(",");
	var newBlindLevel = parseInt($(".level-number").html());
	var bigBlind = blinds[newBlindLevel];
	$(".small").html(bigBlind/2);
	$(".big").html(bigBlind);
	$(".level-number").html(parseInt($(".level-number").html()) + 1);
	$('#timer').removeClass('red').countdown('change', {until: +parseInt(localStorage.getItem("countdown"))});
}
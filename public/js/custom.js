$(document).ready(function() {
	$('#timer').countdown({until: +1, compact: true, format: "MS", onTick: redOn5Seconds, onExpiry: updateData});
});

function redOn5Seconds(periods){
	if ($.countdown.periodsToSeconds(periods) == 5){ 
		$(this).addClass('red'); 
	}
}

function updateData(){
	var smallBlind = parseInt($(".small").html());
	var bigBlind = parseInt($(".big").html());
	$(".small").html(bigBlind);
	$(".big").html(bigBlind*2);
	$(".level-number").html(parseInt($(".level-number").html()) + 1);
	$('#timer').removeClass('red').countdown('change', {until: +10});
}
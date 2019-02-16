// progress bar
function showProgress(){
	$("progress").each(function(){
		$(this).attr("value",$(this).text());
	});
}

// google map
function showMap(){
	var coordinate=new google.maps.LatLng(22.469398,114.194319);

	var option={
		zoom: 18,
		center: coordinate,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map=new google.maps.Map(document.getElementById("map"),option);
}

// send message
function send(){
	UIkit.notification({
		message: "The message has been sent.",
		pos: "top-center"
	});
	$("form").trigger("reset");
}

// count
$(document).ready(function(){
	var option={
		useEasing: true,
		separator: ",",
	};

	var count=new CountUp("count",0,20,0,120,option);
	var count2=new CountUp("count2",0,92,0,120,option);
	var count3=new CountUp("count3",0,100,0,120,option);
	
	count.start();
	count2.start();
	count3.start();
});
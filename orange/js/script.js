$(function(){
	var url="https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=ea50fcfb066341ffaecc59123ebb60cb";

	$.getJSON(url,function(data){
		// console.log(data);

		for(var i=0;i<data.totalResults;i++){
			$("#google-1-title"+i).html(data.articles[i].title);
			$("#google-1-description"+i).html(data.articles[i].description);
			$("#google-2-image"+i).attr("caption",data.articles[i].description);
			$("#google-1-image"+i).attr("src",data.articles[i].urlToImage);
			$("#google-2-image"+i).attr("href",data.articles[i].urlToImage);
			$("#google-1-link"+i).attr("href",data.articles[i].url);
		}
	});
});

news("bloomberg");
function news(newsType){
	var url="https://newsapi.org/v2/everything?q="+newsType+"&apiKey=ea50fcfb066341ffaecc59123ebb60cb";

	$.getJSON(url,function(data){
		// console.log(data);

		$("#newsSearch").empty();
		for(var i=0;i<data.articles.length;i++){
			$("#newsSearch").append("<li><a href="+data.articles[i].url+" target='_blank'>"+data.articles[i].description+"</a></li>");
			if(i==7){
				break;
			}
		}
		$("#searchNews").trigger("reset");
	});
};

weather("Hong Kong");
function weather(location){
	var url="http://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=91ab29ee9370c059e829e26edb23243b";

	$.getJSON(url,function(data){
		// console.log(data);

		var dt=new Date();
		$("#dt").html(dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate());

		$("#temp").html((data.main.temp-273).toFixed(2)+" &#8451;");
		$("#range").html((data.main.temp_min-273).toFixed(2)+" - "+(data.main.temp_max-273).toFixed(2)+" &#8451;");
		$("#humidity").html(data.main.humidity+"%");
		$("#windSpeed").html((data.wind.speed*3600/1000).toFixed(2)+" km/h");
		$("#pressure").html(data.main.pressure+" hPa");
		$("#visibility").html((data.visibility/1000).toFixed(1)+" km");
		$("#description").html(data.weather["0"].description);
	});
}

$(function(){
	var url="https://newsapi.org/v2/top-headlines?sources=cnbc&apiKey=ea50fcfb066341ffaecc59123ebb60cb";

	$.getJSON(url,function(data){
		// console.log(data);

		for(var i=0;i<data.totalResults;i++){
			$("#cnbc-1-title"+i).html(data.articles[i].title);
			$("#cnbc-1-description"+i).html(data.articles[i].description);
			$("#cnbc-2-image"+i).attr("caption",data.articles[i].description);
			$("#cnbc-1-image"+i).attr("src",data.articles[i].urlToImage);
			$("#cnbc-2-image"+i).attr("href",data.articles[i].urlToImage);
			$("#cnbc-1-link"+i).attr("href",data.articles[i].url);
		}
	});
});

$(function(){
	var url="https://newsapi.org/v2/top-headlines?sources=espn&apiKey=ea50fcfb066341ffaecc59123ebb60cb";

	$.getJSON(url,function(data){
		// console.log(data);

		for(var i=0;i<data.totalResults;i++){
			$("#espn-1-title"+i).html(data.articles[i].title);
			$("#espn-2-image"+i).attr("caption",data.articles[i].description);
			$("#espn-1-image"+i).attr("src",data.articles[i].urlToImage);
			$("#espn-2-image"+i).attr("href",data.articles[i].urlToImage);
			$("#espn-1-link"+i).attr("href",data.articles[i].url);
		}
	});
});

batchQuote();
function batchQuote(){
	var url="https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=aapl,msft,fb,snap,jpm&apikey=A359QS6YWOGICV6C";

	$.getJSON(url,function(data){
		// console.log(data);

		var s=new Array();
		for(var i in data["Stock Quotes"]){
			s.push(data["Stock Quotes"][i]["1. symbol"],data["Stock Quotes"][i]["2. price"],data["Stock Quotes"][i]["3. volume"]);
		}
		// console.log(s);

		for(var i=0,j=0;i<s.length;i++,j+=3){
			$("#batchquote"+i+" td:nth-child(1)").html(s[j]);
			$("#batchquote"+i+" td:nth-child(2)").html(s[j+1]);
			$("#batchquote"+i+" td:nth-child(3)").html(s[j+2]);
		}
	});
}

singleQuote("msft");
function singleQuote(code){
	var url="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+code+"&interval=1min&apikey=A359QS6YWOGICV6C&outputsize=compact&datatype=json";

	$.getJSON(url,function(data){
		// console.log(data);

		$("#singlequote-code").html(data["Meta Data"]["2. Symbol"]);
		var s=new Array();
		for(var i in data["Time Series (Daily)"]){
			s.push(data["Time Series (Daily)"][i]["1. open"],data["Time Series (Daily)"][i]["2. high"],data["Time Series (Daily)"][i]["3. low"],data["Time Series (Daily)"][i]["4. close"],data["Time Series (Daily)"][i]["5. volume"]);
		}
		// console.log(s);

		$("#singlequote-open").html(s[0]);
		$("#singlequote-range").html(s[2]+" - "+s[1]);
		$("#singlequote-close").html(s[3]);
		$("#singlequote-volume").html(s[4]+" USD");
		$("#quote").trigger("reset");
	});
}

chart("msft");
function chart(code){
	var url="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+code+"&interval=1min&apikey=A359QS6YWOGICV6C&outputsize=compact&datatype=json";

	var dataset=[];
	$.getJSON(url,function(data){
		// console.log(data);
		$.each(data["Time Series (Daily)"],function(key){
			dataset.push({x: new Date(key),y: [parseFloat(data["Time Series (Daily)"][key]["1. open"]),parseFloat(data["Time Series (Daily)"][key]["2. high"]),parseFloat(data["Time Series (Daily)"][key]["3. low"]),parseFloat(data["Time Series (Daily)"][key]["4. close"])]});
		});
		// console.log(dataset);
		var chart=new CanvasJS.Chart("stockChart",{
			title: {
				text: data["Meta Data"]["2. Symbol"]
			},
			zoomEnabled: true,
			axisY: {
				includeZero: false,
				title: "Price",
				prefix: "$"
			},
			axisX: {
				interval: 1,
				intervalType: "month",
				valueFormatString: "YYYY-MM",
				labelAngle: 0
			},
			data: [{
				type: "candlestick",
				dataPoints: dataset
			}]
		});
		chart.render();
	});
}

$(function autoRefresh(){
	setInterval(function(){
		batchQuote();
	},1000*60*10);
});

exchange("USD","HKD",1);
function exchange(from,to,amount){
	var url="https://api.fixer.io/latest?base="+from;

	$.getJSON(url,function(data){
		// console.log(data);
		if(from==to){
			rate=1;
		}else{
			rate=data.rates[$("#toCurrency").val()];
		}
		$("#newAmount").html(amount*rate);
	});
}

function send(){
	UIkit.notification({
		message: "The message has been sent.",
		pos: "top-center"
	});
	$("form").trigger("reset");
}

function showMap(){
	var coordinate=new google.maps.LatLng(38.476895,-122.740463);

	var option={
		zoom: 18,
		center: coordinate,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map=new google.maps.Map(document.getElementById("map"),option);
}

job("");
function job(jobType){
	var url="https://jobs.search.gov/jobs/search.json?query="+jobType;

	$.getJSON(url,function(data){
		// console.log(data);

		var s=new Array();
		for(var i in data){
			s.push(data[i].position_title,data[i].locations["0"],data[i].organization_name,data[i].start_date,data[i].end_date,data[i].url);
		}
		// console.log(s);

		$("#vacancy tr:not(:first)").remove();
		for(var i=0;i<s.length;i+=6){
			$("#vacancy").append("<tr><td>"+s[i]+"</td><td>"+s[i+1]+"</td><td>"+s[i+2]+"</td><td>"+s[i+3]+"</td><td>"+s[i+4]+"</td></tr>");
		}

		$("#searchJob").trigger("reset");
	});
}
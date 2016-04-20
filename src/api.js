var _ = require('lodash');
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?lang=de&APPID=cec5e5846f488fd6a41d2dece90f8f1c';

var kelvinToC = function(kelvin) {
	return Math.round(kelvin - 275.15) + ' °C';
};
var dtToText = function(cod) {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	var date = new Date(cod*1000);
	// Hours part from the timestamp
	var hours = date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();
	// Will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes.substr(-2);
	return formattedTime;
};

module.exports = function(latitude, longitude) {
	// var url = rootUrl + '&lat=' + latitude + '&lon' + longitude;
	var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`; // new ES6

	return fetch(url)
		.then(function(response) {
			return response.json()
		})
		.then(function(json) {
			return {
				city: json.name,
				temperature: kelvinToC(json.main.temp),
				humidity: json.main.humidity,
				pressure: json.main.pressure,
				temp_min: kelvinToC(json.main.temp_min),
				temp_max: kelvinToC(json.main.temp_max),
				wind: json.wind.speed,
				recording: dtToText(json.dt),
				weatherDescription: _.capitalize(json.weather[0].description),
				weatherMain: json.weather[0].main,
				weatherIcon: json.weather[0].icon,
				clouds: json.clouds.all,
				sunrise: dtToText(json.sys.sunrise),
				sunset: dtToText(json.sys.sunset),
			}
		});
}

 
// var React = require('react');

// var api = React.createClass({

// 	render: function() {
// 		return (
// 			<div />
// 		);
// 	}

// });

// module.exports = api;
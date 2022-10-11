// A quick play around with using the core node http module

const http = require("http");
const { weatherstackBaseUrl, weather_units } = require("../constants");
require("dotenv").config();

const weather_access_key = process.env.WEATHERSTACK_KEY;

// Dummy lat and long
const lat = "53.379809";
const long = "-1.371664";

const url = new URL(weatherstackBaseUrl);
url.searchParams.append("access_key", weather_access_key);
url.searchParams.append("units", weather_units);
url.searchParams.append("query", `${lat},${long}`);

const request = http.request(url, res => {
	let data = "";
	res.on("data", chunk => {
		console.log("RAN");
		data = data + chunk.toString();
	});

	res.on("end", () => {
		const body = JSON.parse(data);
		console.log(body);
	});
});

request.end();

request.on("error", err => {
	console.log("An error: ", err);
});


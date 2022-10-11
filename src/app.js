const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeolocation = require("../utils/geocode");
const getWeather = require("../utils/getWeather");

const PORT = 3000;

const app = express();
const startServer = () => {
	// Define paths for express config
	const publicDirectoryPath = path.join(__dirname, "../public");
	const viewsPath = path.join(__dirname, "../templates/views");
	const partialsPath = path.join(__dirname, "../templates/partials");

	// Setup handlebars engine, views location and partials location
	app.set("view engine", "hbs");
	app.set("views", viewsPath);
	hbs.registerPartials(partialsPath);

	// Setup static directory to serve
	app.use(express.static(publicDirectoryPath));

	app.get("", (req, res) => {
		res.render("index", { title: "Weather", name: "Jason Taylor" });
	});

	app.get("/help", (req, res) => {
		res.render("help", {
			title: "Help",
			name: "Jason Taylor",
			helpText: "Do you require help?",
		});
	});

	app.get("/about", (req, res) => {
		res.render("about", {
			title: "About Me",
			name: "Jason Taylor",
			src: "/img/profile_image.jpg",
		});
	});

	app.get("/weather", async (req, res) => {
		const { address } = req.query;
		if (!address) {
			return res.send({
				error: "You must provide the address property",
			});
		}

		try {
			const { lat, long, location } = await getGeolocation(address);
			const { weather_descriptions, temperature, feelslike } = await getWeather(
				lat,
				long
			);

			res.send({
				address,
				location,
				forecast: `${weather_descriptions[0]}: it is currently ${temperature} degrees out in ${location}. It feels like ${feelslike} degrees out.`,
			});
		} catch (err) {
			res.send({ error: err.message });
		}
	});

	app.get("/help/*", (req, res) => {
		res.render("404", {
			title: "404",
			message: "Help article not found",
			name: "Jason Taylor",
		});
	});

	app.get("*", (req, res) => {
		res.render("404", {
			title: "404",
			message: "Page not found",
			name: "Jason Taylor",
		});
	});

	app.listen(PORT, () => {
		console.log(`Server is up on port ${PORT}`);
	});
};

module.exports = startServer;

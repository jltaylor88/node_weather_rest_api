const { weather_units } = require("../constants");
const { weatherstackHttp } = require("./http");
const ResponseError = require("./ResponseError");
require("dotenv").config();

const weather_access_key = process.env.WEATHERSTACK_KEY;

// FUNCTION TO GET CURRENT WEATHER FROM LATITUDE AND LONGITUDE
const getWeather = async (lat, long) => {
	try {
		const resp = await weatherstackHttp.get("", {
			params: {
				access_key: weather_access_key,
				query: `${lat},${long}`,
				units: weather_units,
			},
		});

		const { current } = resp.data;
		// Create a ResponseError instance if there is no matching location for geolocation
		if (!current) {
			const errCode = "NO_DATA_FOR_COORDS";
			throw new ResponseError(
				`${resp.data.error.info}`,
				{
					cause: { code: errCode },
				},
				errCode
			);
		}

		const { weather_descriptions, temperature, feelslike } = resp.data.current;

		return { weather_descriptions, temperature, feelslike };
	} catch (error) {
		throw new ResponseError(
			`Error in getWeather: ${error.message}`,
			{ cause: { error } },
			error.code
		);
	}
};

module.exports = getWeather;


const { mapboxHttp } = require("./http");
const ResponseError = require("./ResponseError");
require("dotenv").config();

const mapboxToken = process.env.MAP_BOX_PUBLIC_KEY;

// FUNCTION TO GET LATITUDE AND LONGITUDE FROM PLACE
const getGeolocation = async address => {
	try {
		const resp = await mapboxHttp.get(
			`/mapbox.places/${encodeURIComponent(address)}.json`,
			{
				params: {
					access_token: mapboxToken,
					limit: 1,
				},
			}
		);

		const { features } = resp.data;

		// Create a ResponseError instance if there are no matching values for the place
		if (features.length === 0) {
			const errCode = "NO_MATCHING_VALUES";
			throw new ResponseError(
				"no matching locations",
				{ cause: { code: errCode } },
				errCode
			);
		}

		const first = resp.data.features[0];

		const coords = first.center;
		const long = coords[0];
		const lat = coords[1];
		const location = first.place_name;

		return { lat, long, location };
	} catch (error) {
		throw new ResponseError(
			`Error in getGeolocation: ${error.message}`,
			{ cause: error },
			error.code
		);
	}
};

module.exports = getGeolocation;

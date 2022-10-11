const axios = require("axios");
const { mapboxBaseURL, weatherstackBaseUrl } = require("../constants");

const mapboxHttp = axios.create({
	baseURL: mapboxBaseURL,
});

const weatherstackHttp = axios.create({
	baseURL: weatherstackBaseUrl,
});

module.exports = { mapboxHttp, weatherstackHttp };

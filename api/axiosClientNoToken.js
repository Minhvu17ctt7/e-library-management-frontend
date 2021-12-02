import axios from 'axios';
import queryString from 'query-string';

const BASE_URL = process.env.NEXT_APP_BASE_URL || 'http://locahost:1337';

const axiosClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
	// Handle token here ...
	return config;
});
axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response;
		}
		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);
export default axiosClient;

import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

export const BASE_URL = process.env.NEXT_APP_BASE_URL || 'http://localhost:1337';

const axiosClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
	async (config) => {
		// Handle token here ...
		return config;
	}
);
axiosClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);
export default axiosClient;

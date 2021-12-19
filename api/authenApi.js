import axios from './axiosClientNoToken';

const authenApi = {
	login: (body) => {
		return axios.post('/auth/local', body);
	},
};
export default authenApi;

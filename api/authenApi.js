import axios from './axiosClientNoToken';

const authenApi = {
	register(data) {
		return axios.post('/auth/register', {
			...data,
		});
	},
	async login(email, password) {
		const res = await axios.post('/auth/login', {
			email,
			password,
		});
		const { data } = res;
		return res;
	},
};
export default authenApi;

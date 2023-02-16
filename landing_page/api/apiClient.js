import axios from 'axios';

const apiClient = axios.create({
	baseURL: `https://devapi.democharts.org`,
	withCredentials: true, // This is the default
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		'Access-Control-Allow-Credentials': 'true'
	},
	timeout: 10000,
});

export default apiClient;

import axios from 'axios';

const basePath = import.meta.env.VITE_API_BASE_PATH;

console.log("CREATED");
const apiClient = axios.create({
	baseURL: basePath,
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		'Access-Control-Allow-Credentials':'*',
	},
	timeout: 10000,
});


export default apiClient;

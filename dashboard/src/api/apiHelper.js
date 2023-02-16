/**
 * Todo: refactor to axios.
 **/

import useAuth from "../use/Auth";
const auth = useAuth();


let basePath = 'SET ME UP';

export const setBasePath = (path) => {
	basePath = path;
};

export const aCall = (url, method, body) => fetch(basePath + url, {
	method: method,
	headers: auth.getAuthHeader(),
	mode: "cors",
	body: {},
});

export const aPOST = (url, body) => aCall(url, "POST", body);
export const aGET = (url) => fetch(basePath + url);



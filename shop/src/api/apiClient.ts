import axios from "axios";


export const backendUrlDev = `https://devapi.democharts.org/`;
export const backendUrlProd = `https://api.democharts.org/`;

export const backendUrl = process.env.NODE_ENV === 'production' ? backendUrlProd : backendUrlDev;

const apiClient = axios.create({
    baseURL: backendUrl,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: 0,
});

export default apiClient;

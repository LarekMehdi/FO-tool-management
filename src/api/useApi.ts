import axios, { type AxiosInstance } from "axios";
import qs from "qs";


export function useApi() {

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'}),
    });

    // Juste avant l'envoi de la requète
    api.interceptors.request.use((config) => {
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {

            if (error.response && error.response.status === 401) {
                console.log('error 401');
            }
            if (error.response && error.response.status === 404) {
                console.log("ressource indispo");
            }
            if (error.response && error.response.status === 403) {
                console.log('error 401');
                //location.href = "/error/403";
            }
            return Promise.reject(error);
        }
    );

    return api
}
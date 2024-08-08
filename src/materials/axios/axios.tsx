import axios from "axios";

export const api = axios.create({
    baseURL: 'https://interview.t-alpha.com.br',
})
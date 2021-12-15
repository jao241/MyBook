import axios from "axios";

const addLikeApi = axios.create({
    baseURL: "http://192.168.1.8:3006/"
});

export default addLikeApi;
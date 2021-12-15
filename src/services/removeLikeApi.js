import axios from "axios";

const removeLikeApi = axios.create({
    baseURL: "http://192.168.1.8:3007/"
});

export default removeLikeApi;
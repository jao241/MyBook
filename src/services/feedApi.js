import axios from "axios";

const feedApi = axios.create({
    baseURL: "http://192.168.1.8:3001/"
});

export default feedApi;
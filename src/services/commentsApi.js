import axios from "axios";

const commentsApi = axios.create({
    baseURL: "http://192.168.1.8:3003/"
});

export default commentsApi;
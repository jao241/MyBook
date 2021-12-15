import axios from "axios";

const removeCommentsApi = axios.create({
    baseURL: "http://192.168.1.8:3005/"
});

export default removeCommentsApi;
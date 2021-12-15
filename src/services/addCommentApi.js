import axios from "axios";

const addCommentApi = axios.create({
    baseURL: "http://192.168.1.8:3004/"
});

export default addCommentApi;
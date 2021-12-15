import axios from "axios";

const descriptionApi = axios.create({
    baseURL: "http://192.168.1.8:3002/"
});

export default descriptionApi;
import axios from "axios";
import {HOST} from "@env";

const commentsApi = axios.create({
    baseURL: `http://${HOST}:3003/`
});

export default commentsApi;
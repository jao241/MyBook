import axios from "axios";
import {HOST} from "@env";

const descriptionApi = axios.create({
    baseURL: `http://${HOST}:3002/`
});

export default descriptionApi;
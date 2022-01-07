import axios from "axios";
import {HOST} from '@env';

const feedApi = axios.create({
    baseURL: `http://${HOST}:3001/`
});

export default feedApi;
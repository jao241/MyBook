import axios from "axios";
import {HOST} from '@env';

const removeLikeApi = axios.create({
    baseURL: `http://${HOST}:3007/`
});

export default removeLikeApi;
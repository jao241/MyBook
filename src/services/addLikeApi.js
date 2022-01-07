import axios from "axios";
import {HOST} from '@env';

const addLikeApi = axios.create({
    baseURL: `http://${HOST}:3006/`
});

export default addLikeApi;
import axios from "axios";
import {HOST} from '@env';

const addCommentApi = axios.create({
    baseURL: `http://${HOST}:3004/`
});

export default addCommentApi;
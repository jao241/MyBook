import axios from "axios";
import {HOST} from '@env';

const removeCommentsApi = axios.create({
    baseURL: `http://${HOST}:3005/`
});

export default removeCommentsApi;
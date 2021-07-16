import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.apiUrl;
axios.defaults.withCredentials = true;

export default axios;

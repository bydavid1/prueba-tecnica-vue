import axios from 'axios';

const HTTP = axios.create({
    baseURL: process.env.VUE_APP_MAIN_API_URL,
})

export default HTTP
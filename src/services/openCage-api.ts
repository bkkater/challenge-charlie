import axios from 'axios';

const openCageApi = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1'
})

export default openCageApi;
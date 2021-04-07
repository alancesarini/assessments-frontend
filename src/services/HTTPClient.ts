import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/v1' : 'https://assessments-backend.herokuapp.com/api/v1'
});
import Axios from "axios";
import Cookies from 'js-cookie'
let urls = {
    test: `http://localhost:4000`,
    development: 'http://localhost:4000',
    production: 'https://hesaha1.herokuapp.com'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${Cookies.get('token')}`
    }
});

export default api;
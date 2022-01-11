import Axios from "axios";
import Cookies from 'js-cookie'
let urls = {
    development: 'http://localhost:4000', // url for development server
    production: 'https://hesaha1.herokuapp.com' // url for live server
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV], // detect enviornment set the base url
    headers: {
        'Accept': 'application/json', // data acceptance on server
        'Content-Type': 'application/json', // content type
        'authorization': `Bearer ${Cookies.get('token')}` // get token from cookies set authorization token
    }
});
export default api;

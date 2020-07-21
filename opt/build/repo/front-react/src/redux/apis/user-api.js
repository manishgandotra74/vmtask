import axios from 'axios'
const checkauthentication = async (params) => {
    return axios.post("http://localhost:4000/user/authenticate", params)
};
const registeruser = async (params) => {
    return axios.post("http://localhost:4000/user/register-user", params)
};

export default {
    checkauthentication,
    registeruser,
}
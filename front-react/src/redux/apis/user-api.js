import axios from 'axios'
const checkauthentication = async (params) => {
    return axios.post("https://vast-citadel-98032.herokuapp.com/user/authenticate", params)
};
const registeruser = async (params) => {
    return axios.post("https://vast-citadel-98032.herokuapp.com/user/register-user", params)
};

export default {
    checkauthentication,
    registeruser,
}
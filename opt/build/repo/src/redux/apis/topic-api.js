import axios from 'axios'
let auth_headers =''
let local_storage_headers = JSON.parse(localStorage.getItem('user'))
if (local_storage_headers  && local_storage_headers.data && local_storage_headers.data.length >0){
    auth_headers= local_storage_headers.data[0].token
}
const addtopic = async (params) => {

    return axios.post("http://localhost:4000/topic/addtopic", params,{  headers: {authorization: auth_headers}})
};
const gettopic = async (id) => {
    return axios.get("http://localhost:4000/topic/gettopics/" + id,{  headers: {authorization: auth_headers}})
};

export default {
    addtopic,
    gettopic,
}
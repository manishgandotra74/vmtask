import axios from 'axios'
let auth_headers =''
let local_storage_headers = JSON.parse(localStorage.getItem('user'))
if (local_storage_headers  && local_storage_headers.data && local_storage_headers.data.length >0){
    auth_headers= local_storage_headers.data[0].token
}
const addarticle = async (params) => {

    return axios.post("http://localhost:4000/article/addarticle", params,{  headers: {authorization: auth_headers}})
};
const getarticle = async (id) => {
    return axios.get("http://localhost:4000/article/getarticlebytopicid/" + id,{  headers: {authorization: auth_headers}})
};
const getarticlebyid = async (id) => {
    return axios.get("http://localhost:4000/article/getArticleByid/" + id)
};
const update_article  = async (params) => {
    return axios.post("http://localhost:4000/article/updatearticle", params,{  headers: {authorization: auth_headers}})
};
const addTagforArticle  = async (params) => {
    return axios.post("http://localhost:4000/article/addTag", params,{  headers: {authorization: auth_headers}})
};

export default {
    addarticle,
    getarticle,
    getarticlebyid,
    update_article,
    addTagforArticle
}
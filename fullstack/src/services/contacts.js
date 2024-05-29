import axios from "axios";
const baseUrl = "/api/persons";
const getAll = () => {
  return axios.get(baseUrl).then((res) => {
    return res.data;
  });
};
const create = (newContact) => {
  return axios.post(baseUrl, newContact).then((res) => {
    return res.data;
  });
};
const update = (Contact, id) => {
  return axios.put(`${baseUrl}/${id}`, Contact).then((res) => {
    return res.data;
  });

};
const remove= (id)=>{
 axios.delete(`${baseUrl}/${id}`)
}
export default {
    getAll,
    create,
    update,remove
}
import axios from 'axios'
const baseUrl = '/api/items'


const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}


const createItem = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}


const updateItem = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const removeItem = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}


export default { getAll, createItem, updateItem, removeItem }
import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    const response =  axios.get(baseUrl);
    console.log(response)
   const result = response.then( response => response.data ).catch(error => console.log(error))
   return result;
}

const create = async (newPerson) => {
    const response = await axios.post(baseUrl, newPerson)
    console.log(response.data)
    const result = response.data
    // const result = response.then( response => response.data ).catch( error => console.log(error))
    return result;
}

const update = async (id, person) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, person);
        return response;
        
    } catch (error) {
        return error.response;        
    }

}

const deletePerson =  (id) => {
    const response =  axios.delete(`${baseUrl}/${id}`);
    const result = response.then( response => response.data).catch(error => console.log(error))
    return result;
}

export { getAll, create, update, deletePerson };

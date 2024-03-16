import axios from 'axios'

const API_URL = 'https://musicbrainz.org/ws/2'

const search = async (query, type) => {
    const response = await axios.get(`${API_URL}/${type}?query=${query}&fmt=json`)
    return response.data
}

const getDetails = async (id) => {
    const response = await axios.get(`${API_URL}/artist/${id}`)
    return response.data
}

export default {
    search,
    getDetails
}
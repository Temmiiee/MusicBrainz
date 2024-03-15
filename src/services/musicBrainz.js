import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://musicbrainz.org/ws/2/',
    headers: {
        'User-Agent': 'Application name/<version> (contact-email)'
    }
});

export default {
    search(query, type) {
        return apiClient.get(`${type}?query=${query}&fmt=json`);
    },
    getArtist(id) {
        return apiClient.get(`artist/${id}?fmt=json`);
    },
    getTitle(id) {
        return apiClient.get(`title/${id}?fmt=json`);
    }
};
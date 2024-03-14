<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      results: [],
      searchType: 'recording',
      isLoading: false
    };
  },
  methods: {
    async search() {
      this.isLoading = true;
      const notifications = useNotifications();

      try {
        const response = await axios.get(`/api/ws/2/${this.searchType}/?query=${this.query}&fmt=json`, {
          headers: {
            'User-Agent': 'MyMusic/1.0.0 (termine1u@etu.univ-lorraine.fr)'
          }
        });

        this.results = response.data[this.searchType + 's'];

        for (const result of this.results) {
          if (this.searchType === 'recording' && result.id) {
            const recordingResponse = await axios.get(`/api/ws/2/recording/${result.id}?inc=releases&fmt=json`, {
              headers: {
                'User-Agent': 'MyMusic/1.0.0 (termine1u@etu.univ-lorraine.fr)'
              }
            });

            result.details = recordingResponse.data;
            notifications.success('Les détails de l\'enregistrement ont été récupérés avec succès.');
          } else if (result.id) {
            const artistResponse = await axios.get(`/api/ws/2/artist/${result.id}?inc=aliases&fmt=json`, {
              headers: {
                'User-Agent': 'MyMusic/1.0.0 (termine1u@etu.univ-lorraine.fr)'
              }
            });

            result.details = artistResponse.data;
            notifications.success('Les détails de l\'artiste ont été récupérés avec succès.');
          }
        }
      } catch (error) {
        notifications.error('Une erreur est survenue lors de la recherche.');
      } finally {
        this.isLoading = false;
      }
    },
    formatDuration(duration) {
      if (!duration) return 'Inconnue';
      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / (1000 * 60)) % 60);
      return `${minutes} min ${seconds} s`;
    }
  }
};
</script>

<template>
  <div>
    <h1>ArtisteInfo</h1>
    <select v-model="searchType" class="form-select">
      <option value="recording">Titre</option>
      <option value="artist">Artiste</option>
    </select>
    <input v-model="query" @keyup.enter="search" :placeholder="'Rechercher un ' + (searchType === 'recording' ? 'titre' : 'artiste')" class="form-control">
    <button @click="search" class="btn btn-primary">Rechercher</button>
    <div v-if="isLoading" class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
    <ul class="list-group mt-3">
      <li v-for="(result, index) in results" :key="index" class="list-group-item">
        <h2>{{ result.title || result.name }}</h2>
        <div v-if="result.details" class="card">
          <div class="card-body">
            <p class="card-text">
              <strong>Type:</strong> {{ result.details.type || 'Non disponible' }}<br>
              <strong>Genre:</strong> {{ result.details.gender || 'Non disponible' }}<br>
              <strong>Pays:</strong> {{ result.details.country || 'Non disponible' }}<br>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
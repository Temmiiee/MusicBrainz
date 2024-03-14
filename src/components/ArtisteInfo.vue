<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      results: [],
      searchType: 'recording' // 'recording' pour titre, 'artist' pour artiste
    };
  },
  methods: {
    /**
    * Fait une recherche sur MusicBrainz
    * @params {String} query - La recherche
    * @params {String} searchType - Le type de recherche ('recording' pour titre, 'artist' pour artiste)
    * @returns {Promise} - La promesse de la recherche
    */
    async search() {
        const headers = {
        'User-Agent': 'MyMusic/1.0.0 (termine1u@etu.univ-lorraine.fr)'
        };

        axios.get(`https://musicbrainz.org/ws/2/${this.searchType}/?query=${this.query}&fmt=json`, { headers })
        .then(response => {
            this.results = response.data[this.searchType + 's'];
            this.results.forEach(result => {
                if (this.searchType === 'recording') {
                axios.get(`https://musicbrainz.org/ws/2/recording/${result.id}?inc=releases&fmt=json`, { headers })
                    .then(response => {
                    result.details = response.data;
                    });
                } else {
                    axios.get(`https://musicbrainz.org/ws/2/artist/${result.id}?inc=aliases&fmt=json`)
                    .then(response => {
                        result.details = response.data;
                    });
                }
            });
        });
    },
    /**
     * Fais une recherche si la touche entrée est appuyé
     */
    handleKeyup(event) {
      if (event.key === 'Enter') {
        this.search();
      }
    },
    /**
     * Formate la durée d'une chanson
     * @params {Number} duration - La durée en millisecondes
     * @returns {String} - La durée formatée
     */
    formatDuration(duration) {
      if (!duration) return 'Inconnue';
      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / (1000 * 60)) % 60);
      return `${minutes} min ${seconds} s`;
    }
  }
}
</script>

<template>
  <div>
    <h1>ArtisteInfo</h1>
    <select v-model="searchType">
      <option value="recording">Titre</option>
      <option value="artist">Artiste</option>
    </select>
    <input v-model="query" @keyup="handleKeyup" :placeholder="'Rechercher un ' + (searchType === 'recording' ? 'titre' : 'artiste')">
    <button @click="search">Rechercher</button>
    <ul>
      <li v-for="(result, index) in results" :key="index">
        <h2>{{ result.title || result.name }}</h2>
        <p v-if="searchType === 'recording'">Artiste : {{ result['artist-credit'][0].artist.name }}</p>
        <p v-if="searchType === 'recording'">Durée : {{ formatDuration(result.length) }}</p>
        <p v-if="searchType === 'recording' && result.details.releases[0]">Album : {{ result.details.releases[0].title }}</p>
        <p v-if="searchType === 'recording' && result.details.releases[0]">Date de sortie : {{ result.details.releases[0].date }}</p>
        <p v-if="searchType === 'artist' && result.details.life-span.begin">Date de naissance : {{ result.details.life-span.begin }}</p>
        <p v-if="searchType === 'artist' && result.details.life-span.end">Date de décès : {{ result.details.life-span.end }}</p>

      </li>
    </ul>
  </div>
</template>

<style>

</style>
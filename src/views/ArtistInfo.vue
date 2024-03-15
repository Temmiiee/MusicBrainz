<script>
import axios from 'axios';
export default {
  data() {
    return {
      artistInfo: null,
      titleInfo: null
    };
  },
  methods: {
    async fetchArtistInfo() {
      const response = await axios.get('/api/artist');
      this.artistInfo = response.data;
    },
    async fetchTitleInfo() {
      const response = await axios.get('/api/title');
      this.titleInfo = response.data;
    }
  },
  created() {
    this.fetchArtistInfo();
    this.fetchTitleInfo();
  }
};
</script>
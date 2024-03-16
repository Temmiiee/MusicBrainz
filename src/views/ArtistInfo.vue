<template>
  <div>
    <h1>{{ info.title }}</h1>
    <!-- Afficher plus d'informations ici -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MusicBrainz from '../api/MusicBrainz.js'

const info = ref({})

onMounted(async () => {
  const id = router.currentRoute.value.params.id
  info.value = await MusicBrainz.getDetails(id)
})
</script>
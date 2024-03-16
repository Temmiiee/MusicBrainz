<template>
  <div>
    <div v-for="result in results" :key="result.id">
      <h2>{{ result.title }}</h2>
      <button @click="showDetails(result.id)">Plus de détails</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const results = ref([])

const showDetails = (id) => {
  router.push(`/details/${id}`)
}
</script>
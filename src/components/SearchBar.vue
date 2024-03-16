<template>
    <div>
        <input v-model="query" type="text" placeholder="Rechercher..." />
        <select v-model="type">
            <option value="music">Musique</option>
            <option value="recording">Artiste</option>
        </select>
        <button @click="search">Rechercher</button>
    </div>
</template>

<script setup>
import { ref, withDefaults } from 'vue'

const query = ref('');
const type = ref('music');

const results = await search(query.value, type.value);

const search = async () => {
    results.value = await search(query.value, type.value);
}

</script>
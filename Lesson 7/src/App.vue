<script setup lang="ts">
import { onMounted } from 'vue';
import Food from "./components/Food.vue"
import { useFoodStore } from './store/food-store';
// const foodStore = useFoodStore();
onMounted(() => {
    // foodStore.getFoods();
    // console.log(foodStore.foods);
    
});
</script>

<template>
    <Food />
</template>

<style scoped>

</style>

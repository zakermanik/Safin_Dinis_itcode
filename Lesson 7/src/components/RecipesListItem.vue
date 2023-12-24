<template>
    <div class="list-item">
        <h2>{{ recipe.title }}</h2>
        <p v-html="recipe.summary"></p>
        <img :src="recipe.image" alt="Recipe Image" />
        <p>Dish Type: {{ recipe.dishType }}</p>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { IRecipeItem } from '../interfaces/IRecipeItem';

interface Props {
    recipe: IRecipeItem;
}
const props = defineProps<Props>();
const { recipe } = toRefs(props);
</script>

<style lang="scss" scoped>
.list-item {
    max-width: 800px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    border-radius: 10px;
    padding: 10px;
}</style>
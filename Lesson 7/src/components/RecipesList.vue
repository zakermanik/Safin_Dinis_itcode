<template>
    <div class="list">
        <RecipesListItem v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { IRecipeItem } from '../interfaces/IRecipeItem';
import RecipesListItem from './RecipesListItem.vue';

interface Props {
    recipes: IRecipeItem[];
}
const props = defineProps<Props>();
const { recipes } = toRefs(props);
</script>

<style lang="scss" scoped>
.list {
    max-width: 800px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
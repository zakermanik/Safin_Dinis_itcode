<template>
    <SearchMenu/>
    <RecipeListSearch :recipes="recipesStore.searchingRecipes" />
</template>

<script setup lang="ts">
import RecipeListSearch from '../components/RecipesListSearch.vue'
import SearchMenu from '../components/SearchMenu.vue'

import { onMounted } from 'vue';
import { useRecipesStore } from '../store/recipes-store';

const recipesStore = useRecipesStore();



const loadRecipes = async () => {
    const offset = (1 - 1) * 5;
    await recipesStore.getSearchRecipes('', offset, 5, '', '');
};



onMounted(async () => {
    if (!recipesStore.hasSearchMounted) {
        await loadRecipes();
        recipesStore.hasSearchMounted = true;
    }
});


</script>
<style lang="scss" scoped>


</style>
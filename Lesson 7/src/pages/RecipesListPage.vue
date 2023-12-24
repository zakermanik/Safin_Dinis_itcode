<template>
    <h1>Список рецептов</h1>
    <label for="recipeNumber">Количество рецептов:</label>
    <select id="recipeNumber" v-model="selectedRecipeNumber" @change="loadRecipes">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
    <div v-if="recipesLoaded">
        <RecipeList :recipes="recipesStore.recipes" />
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script setup lang="ts">
import RecipeList from '../components/RecipesList.vue'

import { ref, onMounted } from 'vue';
import { useRecipesStore } from '../store/recipes-store';

const recipesStore = useRecipesStore();
const recipesLoaded = ref(false);

const selectedRecipeNumber = ref(1);

const loadRecipes = async () => {
    this.recipes = [];
    if (recipesStore.recipes.length === 0) {
        await recipesStore.getRecipes(selectedRecipeNumber.value);
    }
    console.log(recipesStore.recipes);
    recipesLoaded.value = true;
};

onMounted(loadRecipes);

</script>

<style lang="scss" scoped></style>
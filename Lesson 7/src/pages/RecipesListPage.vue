<template>
    <h1>Случайные рецепты</h1>
    <div class="menu">
        <label for="recipeNumber">Количество рецептов:</label>
        <select id="recipeNumber" v-model="selectedRecipeNumber">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <el-button @click="loadRecipes">Мне повезёт!</el-button>
    </div>

    <div>
        <RecipeList class="recipe-list" :recipes="recipesStore.recipes" />
    </div>
    <router-view></router-view>
</template>

<script setup lang="ts">
import RecipeList from '../components/RecipesList.vue'

import { ref, onMounted } from 'vue';
import { useRecipesStore } from '../store/recipes-store';

const recipesStore = useRecipesStore();
const selectedRecipeNumber = ref(1);

const loadRecipes = async () => {
    await recipesStore.getRandomRecipes(selectedRecipeNumber.value);
    console.log(recipesStore.recipes);
};

// onMounted(() => {
//     if (!recipesStore.hasMounted) {
//         loadRecipes()
//         recipesStore.hasMounted = true;
//     }
// });

</script>

<style lang="scss" scoped>
h1 {
    text-align: center;
}
.menu {
    display: flex;
    justify-content: center;
}
.recipe-list {
    display: flex;
    justify-content: center;
}
</style>
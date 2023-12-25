<template>
    <h1>Случайные рецепты</h1>

    <div class="menu">
        <el-button @click="loadRecipes">Мне повезёт!</el-button>
    </div>
    <div class="recipe-list">
        <RecipeList class="recipe-list" :recipes="recipesStore.recipes" />
    </div>
    <div class="recipe-info">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import RecipeList from '../components/RecipesList.vue'

import { ref, onMounted } from 'vue';
import { useRecipesStore } from '../store/recipes-store';

const recipesStore = useRecipesStore();
const selectedRecipeNumber = ref(3);

const loadRecipes = async () => {
    await recipesStore.getRandomRecipes(selectedRecipeNumber.value);
};

onMounted(() => {
    if (!recipesStore.hasMounted) {
        loadRecipes()
        recipesStore.hasMounted = true;
    }
});

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

.recipe-info {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>
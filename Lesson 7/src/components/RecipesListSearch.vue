<template>
    <div class="recipe-list">
        <RecipesListSearchItem v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"
            @click="navigateToRecipe(recipe.id)" />
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { IRecipeItem } from '../interfaces/IRecipeItem';
import RecipesListSearchItem from './RecipesListSearchItem.vue';

interface Props {
    recipes: IRecipeItem[];
}
const props = defineProps<Props>();
const { recipes } = toRefs(props);

const router = useRouter();

const navigateToRecipe = (recipeId: number) => {
    router.push({ name: 'searchRecipe', params: { id: recipeId.toString() } });
};

</script>

<style lang="scss" scoped>
.recipe-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    gap: 5px;
}
</style>
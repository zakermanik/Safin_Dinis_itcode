<template>
    <div class="list">
        <RecipesListItem v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" @click="navigateToRecipe(recipe.id)" />
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { IRecipeItem } from '../interfaces/IRecipeItem';
import RecipesListItem from './RecipesListItem.vue';

interface Props {
    recipes: IRecipeItem[];
}
const props = defineProps<Props>();
const { recipes } = toRefs(props);

const router = useRouter();

const navigateToRecipe = (recipeId: number) => {
  router.push({ name: 'recipe', params: { id: recipeId.toString() } });
};

</script>

<style lang="scss" scoped>
.list {
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;

    font-size: 14px;
    
}
</style>
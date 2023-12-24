import { defineStore } from 'pinia';
import { IRecipeItem } from '../interfaces/IRecipeItem';
import { recipes } from '../services/api';

export const useRecipesStore = defineStore("recipes-store", {
  state: () => ({
    recipe: {} as IRecipeItem,
    recipes: [] as IRecipeItem[],
    hasMounted: false,
  }),
  actions: {
    addRecipe(recipe: IRecipeItem) {
      this.recipes.push(recipe);
    },
    async getRandomRecipes(numberOfRecipes: number) {
      try {
        const { data } = await recipes.fetchRandomRecipes(numberOfRecipes);
        this.recipes = data.recipes.map((recipeData: any) => ({
          id: recipeData.id,
          title: recipeData.title,
          summary: recipeData.summary,
          image: recipeData.image,
          dishType: recipeData.dishTypes[0],
        }));
        return this.recipes;
      } catch (error: any) {
        console.error('Error fetching recipes: ', error.message);
        throw error;
      }
    },
    async getOneRecipe(id: number) {
      try {
        const { data } = await recipes.fetchOneRecipe(id);
        this.recipe = {
          id: data.id,
          title: data.title,
          summary: data.summary,
          image: data.image,
          dishType: data.dishTypes[0],
        };
        return this.recipe;
      } catch (error: any) {
        console.error('Error fetching one recipe: ', error.message);
        throw error;
      }
    },
  },
});
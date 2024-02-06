import { defineStore } from 'pinia';
import { IRecipeItem } from '../interfaces/IRecipeItem';
import { recipes } from '../services/api';

export const useRecipesStore = defineStore("recipes-store", {
  state: () => ({
    recipe: {},
    recipe_ID: 0 as number,
    recipes: [] as IRecipeItem[],
    searchingRecipes: [] as IRecipeItem[],
    totalResults: 0 as number,

    isLoading: false,
    isLoadingOneRecipe: false,
    isLoadingSearchRecipe: false,
    
    hasMounted: false,
    hasSearchMounted: false,
  }),
  actions: {
    async getRandomRecipes(numberOfRecipes: number) {
      this.isLoading = true;
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
        console.error('Ошибка в получении рандомных рецептов: ', error.message);
        throw error;
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    async getOneRecipe(id: number) {
      this.isLoadingOneRecipe = true;
      try {
        const { data } = await recipes.fetchOneRecipe(id);
        this.recipe = {
          id: data.id,
          title: data.title,
          summary: data.summary,
          image: data.image,
          readyInMinutes: data.readyInMinutes,
          servings: data.servings,
          instructions: data.instructions,
          dishType: data.dishTypes[0],
        };
        return this.recipe;
      } catch (error: any) {
        console.error('Ошибка поулчения одного рецепта: ', error.message);
        throw error;
      } finally {
        setTimeout(() => {
          this.isLoadingOneRecipe = false;
        }, 1000);
      }
    },
    async getRecipes(ids: string) {
      this.isLoadingSearchRecipe = true;
      try {
        const { data } = await recipes.fetchRecipes(ids);
        this.searchingRecipes = data;
        return this.searchingRecipes;
      } catch (error: any) {
        console.error('Ошибка в получении рецептов: ', error.message);
        throw error;
      } finally {
        setTimeout(() => {
          this.isLoadingSearchRecipe = false;
        }, 1000);
      }
    },
    async getSearchRecipes(query: string, offset: number, number: number, diet: string, cuisine: string) {
      this.isLoadingSearchRecipe = true;
      try {
        const { data } = await recipes.fetchSearchRecipes(query, offset, number, diet, cuisine);
        this.searchingRecipes = data.results.map((recipeData: any) => ({
          id: recipeData.id,
          title: recipeData.title,
          image: recipeData.image,
        }));
        this.totalResults = data.totalResults;
        return this.searchingRecipes;
      } catch (error: any) {
        console.error('Ошибка в поиске рецептов: ', error.message);
        throw error;
      } finally {
        setTimeout(() => {
          this.isLoadingSearchRecipe = false;
        }, 1000);
      }
    }
  },
});
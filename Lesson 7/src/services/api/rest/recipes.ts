import makeRequest from "../httpClient";

const apiKey = "9c7b2a7b20754f48a4e90939d12e619e"

export const fetchRandomRecipes = (numberOfRecipes: number) =>
    makeRequest({
        url: `https://api.spoonacular.com/recipes/random?number=${numberOfRecipes}`,
        method: "GET",
        headers: {
            "x-api-key": apiKey,
        },
    });
    
export const fetchOneRecipe = (id: number) =>
    makeRequest({
        url: `https://api.spoonacular.com/recipes/${id}/information`,
        method: "GET",
        headers: {
            "x-api-key": apiKey,
        },
    });
export const fetchRecipes = (ids: string) =>
    makeRequest({
        url: `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}`,
        method: "GET",
        headers: {
            "x-api-key": apiKey,
        },
    });
export const fetchSearchRecipes = (query: string, offset: number, number: number, diet: string, cuisine: string) =>
    makeRequest({
        url: `https://api.spoonacular.com/recipes/complexSearch`,
        method: "GET",
        params: {
            query,
            offset,
            number,
            diet,
            cuisine,
        },
        headers: {
            "x-api-key": apiKey,
        },
    });
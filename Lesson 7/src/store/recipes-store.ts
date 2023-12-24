import { defineStore } from 'pinia';
import { IRecipeItem } from '../interfaces/IRecipeItem';
import { recipes } from '../services/api'
export const useRecipesStore = defineStore("recipes-store", {
    state: () => ({
        recipes: 
        //     { id: 651987, title: 'Mini Zucchini Bites (Cuadritos De Calabacin)', summary: "Blackberry Cobbler might be just the dessert you are searching for. This recipe serves 6 and costs 79 cents per serving. One serving contains <b>270 calories</b>, <b>4g of protein</b>, and <b>17g of fat</b>. A mixture of baking powder, blackberry, flour, and a handful of other ingredients are all it takes to make this recipe so flavorful. This recipe is liked by 2 foodies and cooks. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. It is a <b>very affordable</b> recipe for fans of Southern food. It is a good option if you're following a <b>lacto ovo vegetarian</b> diet. It is brought to you by Foodista. All things considered, we decided this recipe <b>deserves a spoonacular score of 30%</b>. This score is not so outstanding. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/blackberry-cobbler-744359\">Blackberry Cobbler</a>, <a href=\"https://spoonacular.com/recipes/blackberry-cobbler-50438\">Blackberry Cobbler</a>, and <a href=\"https://spoonacular.com/recipes/blackberry-cobbler-1029389\">Blackberry Cobbler</a>.", image: 'https://spoonacular.com/recipeImages/651987-556x370.jpg', dishType: 'side dish' },
        //     { id: 648479, title: 'Japanese Mabo Tofu With Eggplant', summary: 'You can never have too many main course recipes, s…japanese-eggplant-1381037">Japanese Eggplant</a>.', image: 'https://spoonacular.com/recipeImages/648479-556x370.jpg', dishType: 'lunch' },
        //     { id: 641047, title: "Curious George's Gluten-Free Banana Nut Bread", summary: "Curious George's Gluten-Free Banana Nut Bread migh…Nut Cheerios</a> are very similar to this recipe.", image: 'https://spoonacular.com/recipeImages/641047-556x370.jpg', dishType: "morning meal" }
        // ] as IRecipeItem[],
        [] as IRecipeItem[],
    }),
    actions: {
        addRecipe(recipe: IRecipeItem) {
            this.recipes.push(recipe);
        },
        getRecipes(numberOfRecipes: number) {
            
            
            return recipes.fetchRandomRecipes(numberOfRecipes).then(({ data }) => {
                const recipesToAdd: IRecipeItem[] = data.recipes.map((recipeData: any) => {
                    return {
                        id: recipeData.id,
                        title: recipeData.title,
                        summary: recipeData.summary,
                        image: recipeData.image,
                        dishType: recipeData.dishTypes[0],
                    };
                });

                recipesToAdd.forEach((recipe) => this.addRecipe(recipe));

                return recipesToAdd;
            });
        },
    },
});
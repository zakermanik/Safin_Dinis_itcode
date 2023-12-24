import { RouteRecordRaw } from "vue-router";
import MainPage from "../pages/MainPage.vue"
import RecipesListPage from "../pages/RecipesListPage.vue"
import RecipeItemPage from "../pages/RecipeItemPage.vue"
import AboutUsPage from "../pages/AboutUsPage.vue"
import SearchPage from "../pages/SearchPage.vue"

const routes: readonly RouteRecordRaw[] = [
    {
        path: "/",
        name: "Main",
        component: MainPage
    },
    {
        path: "/recipes",
        component: RecipesListPage,
        children: [
            {
                path: ":id",
                name: "recipe",
                component: RecipeItemPage,
            },
        ],
    },
    {
        path: "/about",
        name: "About",
        component: AboutUsPage,
    },
    {
        path: "/Search",
        name: "Search",
        component: SearchPage,
    }
]

export default routes
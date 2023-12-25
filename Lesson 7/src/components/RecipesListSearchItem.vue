<template>
    <div class="list-item" @click="handleClick">
        <div class="list-item-main" v-show="!recipesStore.isLoadingSearchRecipe">
            <div class="list-item-info">
                <h2>{{ recipe.title }}</h2>
                <p>Dish Type: {{ recipe.dishType }}</p>
            </div>
            <div class="list-item-img">
                <img :src="recipe.image" alt="Recipe Image" />
            </div>
        </div>
        <div style="width: 300px; height: 200px;" v-show="recipesStore.isLoadingSearchRecipe">
            <el-skeleton style="width: 300px; height: 150px;" animated>
                <template #template>
                    <div style="padding: 14px">
                        <el-skeleton-item variant="p" style="width: 100%" />
                        <div style=" display: flex; align-items: center; justify-items: space-between;">
                            <el-skeleton-item variant="text" style="width: 30%" />
                        </div>
                    </div>
                    <el-skeleton-item variant="image" style="width: 300px; height: 150px;" />
                </template>
            </el-skeleton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { IRecipeItem } from '../interfaces/IRecipeItem';
import { useRecipesStore } from '../store/recipes-store';

interface Props {
    recipe: IRecipeItem;
}
const props = defineProps<Props>();
const { recipe } = toRefs(props);

const recipesStore = useRecipesStore();

const handleClick = async () => {
    recipesStore.recipe_ID = recipe.value.id;
    console.log(recipesStore.recipe_ID);
};
</script>

<style lang="scss" scoped>
.list-item {
    margin-bottom: 20px;
    .list-item-main {
        width: 300px;
        height: 200px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .2);
        padding: 10px;
        justify-content: center;
        align-items: center;
        z-index: 1;
        cursor: pointer;

        font-size: 12px;

        .list-item-info {
            position: relative;
            margin-bottom: -100px;
            height: 50%;

            h2,
            p {}
        }

        .list-item-img {
            background: linear-gradient(180deg, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 0) 60%);
            margin: -10px;
            border-radius: 10px;
            width: inherit;


            img {
                z-index: -1;
                top: 3px;
                position: relative;
                border-radius: 10px;
                width: inherit;
            }
        }
    }
}

.list-item-main:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
}
</style>
<template>
    <div class="list-item" @click="handleClick">
        <div class="list-item-main" v-show="!recipesStore.isLoadingSearchRecipe">
            <div class="list-item-info">
                <h2>{{ recipe.title }}</h2>
            </div>
            <div class="list-item-img">
                <img :src="recipe.image" alt="Recipe Image" />
            </div>
        </div>
        <div style="width: 300px; height: 100px;" v-show="recipesStore.isLoadingSearchRecipe">
            <el-skeleton style="width: 300px; height: 100px;" animated>
                <template #template>
                    <div style="">
                        <el-skeleton-item variant="p" style="width: 100%;" />
                    </div>
                    <el-skeleton-item variant="image" style="width: 300px; height: 75px;" />
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
};
</script>

<style lang="scss" scoped>
.list-item {
    .list-item-main {
        width: 300px;
        height: 100px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .2);
        
        justify-content: center;
        align-items: center;
        z-index: 1;
        cursor: pointer;

        font-size: 12px;
        position: relative;

        .list-item-info {
            position: absolute;
            z-index: 1;
            padding: 10px;
        }

        .list-item-img {
            background: linear-gradient(180deg, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 90%);
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            height: inherit;

            img {
                z-index: -1;
                position: relative;
                border-radius: 10px;
            }
        }
    }
}

.list-item-main:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
}
</style>
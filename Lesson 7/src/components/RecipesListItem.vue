<template>
    <div class="list-item" @click="handleClick">
        <div class="list-item-info">
            <h2>{{ recipe.title }}</h2>
            <p v-html="recipe.summary"></p>
            <p>Dish Type: {{ recipe.dishType }}</p>
        </div>
        <div class="list-item-img">
            <img :src="recipe.image" alt="Recipe Image" />
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
    const result = await recipesStore.getOneRecipe(recipe.value.id);
    console.log(result);
};
</script>

<style lang="scss" scoped>
.list-item {
    max-width: 600px;
    max-height: 400px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .2);
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    z-index: 1;
    cursor: pointer;

    .list-item-info {
        position: relative;
        margin-bottom: -120px;
        h2,
        p {
            max-height: 50px;
            overflow: hidden;
        }
    }

    .list-item-img {
        background: linear-gradient(180deg, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 0) 60%);
        margin: -10px;
        border-radius: 10px;
        width: 600px;
        

        img {
            z-index: -1;
            top: 3px;
            position: relative;
            border-radius: 10px;
            width: 600px;
        }
    }
}
.list-item:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
}
</style>
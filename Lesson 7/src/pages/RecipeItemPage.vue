<template>
    <div class="list-item">
        <div class="list-item-main" v-show="!recipesStore.isLoadingOneRecipe">
            <div class="list-item-info">
                <h2>{{ recipesStore.recipe.title }}</h2>
                <p v-html="recipesStore.recipe.summary"></p>
                <p>Dish Type: {{ recipesStore.recipe.dishType }}</p>
            </div>
            <div class="list-item-img">
                <img :src="recipesStore.recipe.image" alt="Recipe Image" />
            </div>
        </div>
        <div v-show="recipesStore.isLoadingOneRecipe">
            <el-skeleton style="width: 960px; height: 400px;" animated>
                <template #template>
                    <div style="padding: 14px">
                        <el-skeleton-item variant="p" style="width: 100%;" />
                        <div style=" display: flex; align-items: center; justify-items: space-between;">
                            <el-skeleton-item variant="text" style="width: 30%" />
                        </div>
                    </div>
                    <el-skeleton-item variant="image" style="width: 100%; height: 100%;" />
                </template>
            </el-skeleton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRecipesStore } from '../store/recipes-store';
import { useRoute } from 'vue-router';

const recipesStore = useRecipesStore();

const route = useRoute();

onMounted(() => {
    const id = Number(route.params.id);
    if (!isNaN(id)) {
        fetchRecipe(id);
    }
});

watch(
    () => route.params.id,
    (newRecipeId) => {
        fetchRecipe(newRecipeId);
    }
);

const fetchRecipe = async (id: number) => {
    try {
        await recipesStore.getOneRecipe(id);
    } catch (error: any) {
        console.error('Ошибка получения 1 рецепта:', error.message);
    } 
};
</script>

<style lang="scss" scoped>
.list-item-main {
    width: 950px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .2);
    padding: 10px;
    justify-content: center;
    align-items: center;
    z-index: 1;

    font-size: 14px;

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

.list-item-main:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
}
</style>
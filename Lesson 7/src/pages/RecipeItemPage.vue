<template>
    <div class="list-item">
        <div class="list-item-main" v-show="!recipesStore.isLoadingOneRecipe">
            <div class="list-item-info">
                <h2>{{ recipesStore.recipe.title }}</h2>
                <h3>Ready in Minutes: {{ recipesStore.recipe.readyInMinutes }}</h3>
                <h4>Servings: {{ recipesStore.recipe.servings }}</h4>
                <h4><b>Dish Type:</b> {{ recipesStore.recipe.dishType }}</h4>
                <p v-html="recipesStore.recipe.summary"></p>
                <p><b>instructions:</b> {{ recipesStore.recipe.instructions }}</p>
            </div>
            <div class="list-item-img">
                <img :src="recipesStore.recipe.image" alt="Recipe Image" />
            </div>
        </div>
        <div v-show="recipesStore.isLoadingOneRecipe" style="width:inherit">
            <el-skeleton style="" animated>
                <template #template>
                    <div class="skelet-info">
                        <el-skeleton-item variant="p" style="height: 40px;" />
                        <el-skeleton-item variant="text" style="width: 300px;" />
                        <el-skeleton-item variant="text" style="width: 100px;" />
                        <el-skeleton-item variant="text" style="width: 100px;" />
                        <el-skeleton-item variant="text" style="width: 100%;" />
                        <el-skeleton-item variant="text" style="width: 100%;" />
                        <el-skeleton-item variant="text" style="width: 70%;" />
                        <el-skeleton-item variant="text" style="width: 100%;" />
                        <el-skeleton-item variant="text" style="width: 100%;" />
                        <el-skeleton-item variant="text" style="width: 95%;" />
                        <el-skeleton-item variant="text" style="width: 87%;" />
                        <el-skeleton-item variant="text" style="width: 90%;" />
                        <el-skeleton-item variant="text" style="width: 30%;" />
                        <br>
                        <el-skeleton-item variant="text" style="width: 70%;" />
                        <el-skeleton-item variant="text" style="width: 100%;" />
                        <el-skeleton-item variant="text" style="width: 100%;" />
                        <el-skeleton-item variant="text" style="width: 95%;" />
                        <el-skeleton-item variant="text" style="width: 100%;" />
                        <el-skeleton-item variant="text" style="width: 98%;" />
                        <el-skeleton-item variant="text" style="width: 60%;" />
                    </div>
                    <div class="skelet-info-img">
                        <el-skeleton-item variant="image" style="width: 100%; height: 400px;" />
                    </div>
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
.list-item {
    width: 70%;
    display: flex;
    justify-content: center;

    .list-item-main {

        background-color: white;
        align-items: flex-start;
        justify-content: space-between;
        width: 70%;
        border-radius: 10px;
        display: flex;
        padding: 10px;

        .list-item-info {
            width: 50%;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .list-item-img {
            border-radius: 10px;
            width: 50%;

            img {
                border-radius: 10px;
                width: 100%;
            }
        }
    }
}

s .list-item-main:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
}

.el-skeleton {
    display: flex;
    gap: 20px;
    .skelet-info {
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 14px;
        gap: 10px;
    }
    .skelet-info-img {
        width: 50%;
    }
}
</style>
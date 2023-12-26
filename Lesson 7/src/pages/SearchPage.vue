<template>
    <div class="common-layout">
        <el-container>
            <el-header height="170px">
                <SearchMenu />
            </el-header>
            <el-container class="recipes">
                <el-aside >
                    <el-scrollbar max-height="75vh">
                        <RecipeListSearch   :recipes="recipesStore.searchingRecipes" />
                    </el-scrollbar>
                </el-aside>
                <el-main class="recipe-info">
                    <el-scrollbar max-height="74vh">
                        <div>
                            <router-view></router-view>
                        </div>
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import RecipeListSearch from '../components/RecipesListSearch.vue'
import SearchMenu from '../components/SearchMenu.vue'

import { useRecipesStore } from '../store/recipes-store';

const recipesStore = useRecipesStore();


</script>
<style lang="scss" scoped>
.common-layout * {
    padding: 0;
}
.recipes {
    padding: 10px 0 0 0;
    .el-aside {
        width: 320px;
    }
}
</style>
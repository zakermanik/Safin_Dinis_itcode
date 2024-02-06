<template>
    <div class="container">
        <div class="menu">
            <div class="input">
                <el-input v-model="searchInput" placeholder="Please input" clearable />
                <el-select v-model="selectedCuisine" placeholder="Cuisine">
                    <el-option label="Asian" value="asian"></el-option>
                    <el-option label="Eastern European" value="eastern european"></el-option>
                    <el-option label="French" value="french"></el-option>
                    <el-option label="Indian" value="indian"></el-option>
                    <el-option label="Italian" value="italian"></el-option>
                    <el-option label="Mexican" value="mexican"></el-option>
                    <el-option label="Spanish" value="spanish"></el-option>
                    <el-option label="Thai" value="thai"></el-option>
                </el-select>
            </div>
            <div class="checkboxes">
                <el-checkbox v-model="vegetarianCheckbox">Vegetarian</el-checkbox>
                <el-checkbox v-model="glutenFreeCheckbox">Gluten Free</el-checkbox>
                <el-checkbox v-model="veganCheckbox">Vegan</el-checkbox>
            </div>
            <div class="select">
                
            </div>
            <el-slider class="slider" v-model="recipeNumber" :step="4" :min="10" :max="30" />
            <div class="pagination">
                <el-pagination layout="prev, pager, next" @current-change="handlePageChange" :current-page="currentPage"
                    :page-size="recipeNumber" :total="recipesStore.totalResults"></el-pagination>
                <p>Total resulst - {{ recipesStore.totalResults }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRecipesStore } from '../store/recipes-store';
import { debounce } from 'lodash';

const recipesStore = useRecipesStore();

const searchInput = ref('');
const vegetarianCheckbox = ref(false);
const glutenFreeCheckbox = ref(false);
const veganCheckbox = ref(false);
const selectedCuisine = ref('');
const recipeNumber = ref(10);

const currentPage = ref(1);

const handlePageChange = async (newPage: number) => {
    currentPage.value = newPage;
};
const debouncedHandleSearch = debounce(() => {
    const query = searchInput.value;
    const offset = (currentPage.value - 1) * recipeNumber.value;
    const diet = [
        vegetarianCheckbox.value && 'vegetarian',
        glutenFreeCheckbox.value && 'gluten free',
        veganCheckbox.value && 'vegan',
    ].filter(Boolean).join(',');
    const cuisine = selectedCuisine.value;

    recipesStore.getSearchRecipes(query, offset, recipeNumber.value, diet, cuisine);
}, 500);

onMounted(() => {
    debouncedHandleSearch(),
    watch([searchInput, vegetarianCheckbox, glutenFreeCheckbox, veganCheckbox, selectedCuisine, recipeNumber], debouncedHandleSearch, { immediate: false });
    watch(currentPage, async (newPage) => {
        currentPage.value = newPage;
        await debouncedHandleSearch();
    });
});
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    background-color: white;

    .menu {
        width: 350px;
        padding: 10px 20px;

        .input {
            display: flex;
        }
        .checkboxes {
            display: flex;
            justify-content: space-between;
            .el-checkbox {
                margin-right: 0;
            }
        }
        .select {
            width: 350px; 
        }
        .pagination {
            display: flex;
            flex-direction: column;
            align-items: baseline;
        }
    }

    .slider {
        width: 300px;
    }
}
</style>
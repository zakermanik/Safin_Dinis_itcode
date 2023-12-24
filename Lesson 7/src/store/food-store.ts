import { defineStore } from 'pinia';
import { foods } from '../services/api/rest'
export const useFoodStore = defineStore("food-store", {
    state: () => ({
        foods: []
    }),
    actions: {
        getFoods() {
            return foods.fetchAllFoods().then(({ data }) => {
                return (this.foods = data);
            })
        },
    },
})
import makeRequest from "../httpClient";

const apiKey = "9c7b2a7b20754f48a4e90939d12e619e"

export const fetchAllFoods = () =>
    makeRequest({
        url: "https://api.spoonacular.com/recipes/informationBulk",
        method: "GET",
        headers: {
            "x-api-key": apiKey,
        },
    });
<template>
  <div class="home">
    <h2>New Recipe</h2>
    Title: <input type="text" v-model="newRecipeTitle" /><br />
    Directions: <input type="text" v-model="newRecipeDirections" /><br />
    Ingredients: <input type="text" v-model="newRecipeIngredients" /><br />
    Prep Time: <input type="text" v-model="newRecipePrepTime" /><br />
    Image Url: <input type="text" v-model="newRecipeImageUrl" /><br />
    <button v-on:click="createRecipe()">Add Recipe</button>

    <div v-for="recipe in recipes" :key="recipe.id">
      <h3>Title: {{ recipe.title }}</h3>
      <img :src="recipe.image_url" alt="" /><br />
      <button v-on:click="showRecipe(recipe)">More Info</button>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <p>Prep Time: {{ recipe.friendly_prep_time }}</p>
    </div>
    <dialog id="recipe-details">
      <form method="dialog">
        <h1>Recipe Info</h1>
        <img src="" alt="" />
        <p>Title: ...</p>
        <p>Ingredients: ...</p>
        <p>Directions: ...</p>
        <p>Prep Time: ...</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
img {
  width: 250px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
      newRecipeTitle: "",
      newRecipeDirections: "",
      newRecipeIngredients: "",
      newRecipePrepTime: "",
      newRecipeImageUrl: ""
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("http://localhost:3000/recipes").then((response) => {
        console.log(response.data);
        this.recipes = response.data;
      });
    },
    createRecipe: function () {
      var params = {
        title: this.newRecipeTitle,
        directions: this.newRecipeDirections,
        ingredients: this.newRecipeIngredients,
        prep_time: this.newRecipePrepTime,
        image_url: this.newRecipeImageUrl
      };
      axios
        .post("http://localhost:3000/recipes", params)
        .then((response) => {
          console.log("Success!", response.data);
          this.recipes.push(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    showRecipe: function (recipe) {
      console.log(recipe);
      document.querySelector("#recipe-details").showModal();
    }
  }
};
</script>

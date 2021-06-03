<template>
  <div class="home">
    <h2>New Recipe</h2>
    <button v-on:click="createRecipe()">Add Recipe</button>

    <div v-for="recipe in recipes" :key="recipe.id">
      <h3>Title: {{ recipe.title }}</h3>
      <img :src="recipe.image_url" alt="" />
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <p>Prep Time: {{ recipe.friendly_prep_time }}</p>
    </div>
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
      recipes: []
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
        directions: "Make filling, make crust, put filling in crust, bake",
        ingredients: "Strawberries, rhubarb, pie crust",
        prep_time: 45,
        image_url:
          "https://www.simplyrecipes.com/thmb/e2zSk7O0gwgAyjujpoGx7DbTKC8=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2014__06__strawberry-rhubarb-pie-vertical-a-1600-b5f28ee80738408e8d34ad629a0b431c.jpg"
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
    }
  }
};
</script>

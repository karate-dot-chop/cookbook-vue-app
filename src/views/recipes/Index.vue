<template>
  <div class="recipes-index">
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>{{ recipe.title }}</h2>
      <img :src="recipe.image_url" alt="" />
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <p>Prep Time: {{ recipe.prep_time }}</p>
      <p>Created: {{ recipe.friendly_created_at }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: []
    };
  },
  created: function () {
    axios.get("/recipes").then((response) => {
      console.log("Recipes array", response.data);
      this.recipes = response.data;
    });
  }
};
</script>

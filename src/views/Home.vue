<template>
  <div class="home">
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h3>Title: {{ recipe.title }}</h3>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <p>Prep Time: {{ recipe.friendly_prep_time }}</p>
    </div>
  </div>
</template>

<style></style>

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
    }
  }
};
</script>

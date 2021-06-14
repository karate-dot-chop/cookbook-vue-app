<template>
  <div class="recipes-index">
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>{{ recipe.title }}</h2>
      <router-link :to="`/recipes/${recipe.id}`">
        <img :src="recipe.image_url" alt=""
      /></router-link>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <p>Prep Time: {{ recipe.prep_time }}</p>
      <p>Created {{ relativeDate(recipe.created_at) }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

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
  },
  methods: {
    relativeDate: function (date) {
      return moment(date).fromNow();
    }
  }
};
</script>

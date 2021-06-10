<template>
  <div class="recipes-show">
    <h2>{{ recipe.title }}</h2>
    <img :src="recipe.image_url" alt="" />
    <p>{{ recipe.ingredients }}</p>
    <p>{{ recipe.directions }}</p>
    <p>Added by: {{ recipe.user.name }} on {{ recipe.friendly_created_at }}</p>
    <router-link :to="`/recipes/${recipe.id}/edit`">Edit</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipe: { user: {} }
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log("Recipe object", response.data);
      this.recipe = response.data;
    });
  }
};
</script>

<template>
  <div class="recipes-show">
    <h2>{{ recipe.title }}</h2>
    <img :src="recipe.image_url" alt="" />
    <p>{{ recipe.ingredients }}</p>
    <p>{{ recipe.directions }}</p>
    <p>
      Added by: {{ recipe.user.name }} on
      {{ recipe.created_at }}
    </p>
    <p>
      Current logged in user: {{ typeof $parent.getUserId() }}
      {{ $parent.getUserId() }}
    </p>
    <p>
      User who made recipe: {{ typeof recipe.user.id }} {{ recipe.user.id }}
    </p>
    <span v-if="$parent.getUserId() == recipe.user.id">
      <router-link :to="`/recipes/${recipe.id}/edit`">Edit</router-link> |
      <button v-on:click="destroyRecipe()">Delete</button>
    </span>
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
  },
  methods: {
    destroyRecipe: function () {
      if (confirm("Are you sure you want to delete this recipe?")) {
        axios.delete(`/recipes/${this.recipe.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/recipes");
        });
      }
    }
  }
};
</script>

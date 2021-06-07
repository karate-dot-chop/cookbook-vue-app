<template>
  <div class="home">
    <div>
      <h2>New Recipe</h2>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Title: <input type="text" v-model="newRecipeParams.title" /><br />
      Directions:
      <input type="text" v-model="newRecipeParams.directions" /><br />
      Ingredients:
      <input type="text" v-model="newRecipeParams.ingredients" /><br />
      Prep Time: <input type="text" v-model="newRecipeParams.prep_time" /><br />
      Image Url: <input type="text" v-model="newRecipeParams.image_url" /><br />
      <button v-on:click="createRecipe()">Add Recipe</button>
    </div>
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
        <img :src="currentRecipe.image_url" alt="" />
        <p>Title: <input type="text" v-model="currentRecipe.title" /></p>
        <p>
          Image Url: <input type="text" v-model="currentRecipe.image_url" />
        </p>
        <p>
          Ingredients: <input type="text" v-model="currentRecipe.ingredients" />
        </p>
        <p>
          Directions: <input type="text" v-model="currentRecipe.directions" />
        </p>
        <p>
          Prep Time: <input type="text" v-model="currentRecipe.prep_time" />
        </p>
        <button v-on:click="updateRecipe()">Update</button>
        <button v-on:click="destroyRecipe()">Destroy</button>
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
      newRecipeParams: {},
      currentRecipe: {},
      errors: []
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("http://localhost:3000/recipes").then((response) => {
        console.log("Recipes array", response.data);
        this.recipes = response.data;
      });
    },
    createRecipe: function () {
      axios
        .post("http://localhost:3000/recipes", this.newRecipeParams)
        .then((response) => {
          console.log("Success!", response.data);
          this.recipes.push(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    showRecipe: function (recipe) {
      console.log(recipe);
      this.currentRecipe = recipe;
      document.querySelector("#recipe-details").showModal();
    },
    updateRecipe: function () {
      console.log(this.currentRecipe);
      var updateRecipeParams = {
        title: this.currentRecipe.title,
        directions: this.currentRecipe.directions,
        ingredients: this.currentRecipe.ingredients,
        prep_time: this.currentRecipe.prep_time,
        image_url: this.currentRecipe.image_url
      };
      axios
        .patch(
          `http://localhost:3000/recipes/${this.currentRecipe.id}`,
          updateRecipeParams
        )
        .then((response) => {
          console.log("Success!", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    destroyRecipe: function () {
      axios
        .delete(`http://localhost:3000/recipes/${this.currentRecipe.id}`)
        .then((response) => {
          console.log("Success!", response.data);
          var index = this.recipes.indexOf(this.currentRecipe);
          this.recipes.splice(index, 1);
        });
    }
  }
};
</script>

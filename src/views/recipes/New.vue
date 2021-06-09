<template>
  <div class="recipes-new">
    <form v-on:submit.prevent="createRecipe()">
      <h1>New Recipe</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input
          type="text"
          class="form-control"
          v-model="newRecipeParams.title"
        />
      </div>
      <div class="form-group">
        <label>Ingredients:</label>
        <input
          type="text"
          class="form-control"
          v-model="newRecipeParams.ingredients"
        />
      </div>
      <div class="form-group">
        <label>Directions:</label>
        <input
          type="text"
          class="form-control"
          v-model="newRecipeParams.directions"
        />
      </div>
      <div class="form-group">
        <label>Prep Time:</label>
        <input
          type="text"
          class="form-control"
          v-model="newRecipeParams.prep_time"
        />
      </div>
      <div class="form-group">
        <label>Image Url:</label>
        <input
          type="text"
          class="form-control"
          v-model="newRecipeParams.image_url"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    newRecipeParams: {{ newRecipeParams }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newRecipeParams: {},
      errors: []
    };
  },
  methods: {
    createRecipe: function () {
      axios
        .post("/recipes", this.newRecipeParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/recipes");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

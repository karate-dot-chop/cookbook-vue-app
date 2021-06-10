<template>
  <div class="recipes-edit">
    <form v-on:submit.prevent="updateRecipe()">
      <h1>Edit Recipe</h1>
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
          v-model="editRecipeParams.title"
        />
      </div>
      <div class="form-group">
        <label>Ingredients:</label>
        <input
          type="text"
          class="form-control"
          v-model="editRecipeParams.ingredients"
        />
      </div>
      <div class="form-group">
        <label>Directions:</label>
        <input
          type="text"
          class="form-control"
          v-model="editRecipeParams.directions"
        />
      </div>
      <div class="form-group">
        <label>Prep Time:</label>
        <input
          type="text"
          class="form-control"
          v-model="editRecipeParams.prep_time"
        />
      </div>
      <div class="form-group">
        <label>Image Url:</label>
        <input
          type="text"
          class="form-control"
          v-model="editRecipeParams.image_url"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    editRecipeParams: {{ editRecipeParams }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      editRecipeParams: {},
      errors: []
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log("Recipe object", response.data);
      this.editRecipeParams = response.data;
    });
  },
  methods: {
    updateRecipe: function () {
      axios
        .patch(`/recipes/${this.editRecipeParams.id}`, this.editRecipeParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/recipes/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

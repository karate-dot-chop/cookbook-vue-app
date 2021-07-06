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
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#editRecipeModal"
      >
        Edit
      </button>
      <router-link :to="`/recipes/${recipe.id}/edit`">Edit</router-link> |
      <button class="btn btn-primary" v-on:click="destroyRecipe()">
        Delete
      </button>
    </span>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editRecipeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editRecipeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editRecipeModalLabel">Edit Recipe</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateRecipe()">
              <ul>
                <li
                  class="text-danger"
                  v-for="error in errors"
                  v-bind:key="error"
                >
                  {{ error }}
                </li>
              </ul>
              <div class="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="recipe.title"
                />
              </div>
              <div class="form-group">
                <label>Ingredients:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="recipe.ingredients"
                />
              </div>
              <div class="form-group">
                <label>Directions:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="recipe.directions"
                />
              </div>
              <div class="form-group">
                <label>Prep Time:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="recipe.prep_time"
                />
              </div>
              <div class="form-group">
                <label>Image Url:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="recipe.image_url"
                />
              </div>
              <input type="submit" class="btn btn-primary" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import axios from "axios";
export default {
  data: function () {
    return {
      recipe: { user: {} },
      errors: []
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log("Recipe object", response.data);
      this.recipe = response.data;
    });
  },
  methods: {
    updateRecipe: function () {
      axios
        .patch(`/recipes/${this.recipe.id}`, this.recipe)
        .then((response) => {
          console.log(response.data);
          // close modal
          $("#editRecipeModal").modal("hide");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
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

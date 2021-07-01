<template>
  <div class="recipes-new">
    <form v-on:submit.prevent="createRecipe()">
      <h1>New Recipe</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <img v-if="status" :src="`https://http.cat/${status}`" alt="" />
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
        <label>Image:</label>
        <input
          type="file"
          v-on:change="setFile($event)"
          ref="fileInput"
          class="form-control"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    newRecipeParams: {{ newRecipeParams }} <br />
    image: {{ image }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newRecipeParams: {},
      errors: [],
      status: "",
      image: ""
    };
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    createRecipe: function () {
      var formData = new FormData();
      formData.append("title", this.newRecipeParams.title);
      formData.append("ingredients", this.newRecipeParams.ingredients);
      formData.append("directions", this.newRecipeParams.directions);
      formData.append("prep_time", this.newRecipeParams.prep_time);
      formData.append("image", this.image);
      axios
        .post("/recipes", formData)
        .then((response) => {
          console.log(response.data);
          this.$parent.flashMessage = "Successfully created recipe!";
          this.$router.push("/recipes");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    }
  }
};
</script>

<template>
  <div class="recipes-show">
    <h2>This is a Recipes Show Page</h2>
    <p>{{ recipe }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipe: {}
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

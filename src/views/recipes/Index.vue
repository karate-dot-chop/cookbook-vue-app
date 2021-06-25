<template>
  <div class="recipes-index">
    <div id="fh5co-work-section" class="fh5co-light-grey-section">
      <div class="container">
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <label for="inputPassword6" class="col-form-label">Search</label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="inputPassword6"
              class="form-control"
              aria-describedby="searchBox"
              v-model="searchTerm"
              list="titles"
            />
          </div>
          <div class="col-auto">
            <span id="searchBox" class="form-text">
              Search for a recipe by it's title.
            </span>
          </div>
        </div>
        <br />
        <button v-on:click="setSortAttribute('title')" class="btn btn-success">
          Sort by title
          <span v-if="sortAttribute === 'title' && sortOrder === 1">^</span>
          <span v-if="sortAttribute === 'title' && sortOrder === -1">v</span>
        </button>
        <button
          v-on:click="setSortAttribute('prep_time')"
          class="btn btn-success"
        >
          Sort by prep time
          <span v-if="sortAttribute === 'prep_time' && sortOrder === 1">^</span>
          <span v-if="sortAttribute === 'prep_time' && sortOrder === -1"
            >v</span
          >
        </button>
        <div class="row">
          <div
            class="col-md-4"
            v-for="recipe in filterBy(
              orderBy(recipes, sortAttribute, sortOrder),
              searchTerm
            )"
            v-bind:key="recipe.id"
          >
            <router-link
              :to="`/recipes/${recipe.id}`"
              class="item-grid text-center"
            >
              <div
                class="image"
                :style="`background-image: url(${recipe.image_url})`"
              ></div>
              <div class="v-align">
                <div class="v-align-middle">
                  <h3 class="title">{{ recipe.title }}</h3>
                  <h5 class="category">
                    Created {{ relativeDate(recipe.created_at) }}
                  </h5>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <datalist id="titles">
      <option v-for="recipe in recipes" v-bind:key="recipe.id">
        {{ recipe.title }}
      </option>
    </datalist>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      recipes: [],
      searchTerm: "",
      sortAttribute: "title",
      sortOrder: 1
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
    },
    setSortAttribute: function (attribute) {
      if (this.sortAttribute === attribute) {
        this.sortOrder = this.sortOrder * -1;
      } else {
        this.sortOrder = 1;
        this.sortAttribute = attribute;
      }
    }
  }
};
</script>

<template>
  <div class="recipes-index">
    <datalist id="titles">
      <option v-for="recipe in recipes" v-bind:key="recipe.id">
        {{ recipe.title }}
      </option>
    </datalist>

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
    <button v-on:click="setSortAttribute('prep_time')" class="btn btn-success">
      Sort by prep time
      <span v-if="sortAttribute === 'prep_time' && sortOrder === 1">^</span>
      <span v-if="sortAttribute === 'prep_time' && sortOrder === -1">v</span>
    </button>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        class="col"
        v-for="recipe in filterBy(
          orderBy(recipes, sortAttribute, sortOrder),
          searchTerm
        )"
        v-bind:key="recipe.id"
      >
        <div class="card">
          <router-link :to="`/recipes/${recipe.id}`">
            <img
              :src="recipe.image_url"
              class="card-img-top"
              :alt="recipe.title"
            />
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p class="card-text">Ingredients: {{ recipe.ingredients }}</p>
            <p>Directions: {{ recipe.directions }}</p>
            <p>Prep Time: {{ recipe.prep_time }}</p>
            <p>Created {{ relativeDate(recipe.created_at) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div
      is="transition-group"
      appear
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div
        v-for="recipe in filterBy(
          orderBy(recipes, sortAttribute, sortOrder),
          searchTerm
        )"
        v-bind:key="recipe.id"
      >
        <h2>{{ recipe.title }}</h2>
        <router-link :to="`/recipes/${recipe.id}`">
          <img :src="recipe.image_url" alt=""
        /></router-link>
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Directions: {{ recipe.directions }}</p>
        <p>Prep Time: {{ recipe.prep_time }}</p>
        <p>Created {{ relativeDate(recipe.created_at) }}</p>
      </div>
    </div> -->
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

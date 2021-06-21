<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/map">Map</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recipes">Recipes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recipes/new"
                >New Recipe</router-link
              >
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/logout">Logout</router-link>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/signup">Signup</router-link>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <div v-if="flashMessage">
        {{ flashMessage }}
        <button v-on:click="flashMessage = ''">Dismiss</button>
      </div>
      <!-- Renders current .vue template -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      flashMessage: ""
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    }
  }
};
</script>

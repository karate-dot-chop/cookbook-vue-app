<template>
  <div class="home">
    <h1>{{ message }} and my name is {{ name }}</h1>
    <button v-on:click="sayMyName()">Click me</button>
  </div>
</template>

<style></style>

<script>
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      name: "Dani"
    };
  },
  created: function () {},
  methods: {
    sayMyName: function () {
      console.log(this.name);
    }
  }
};
</script>

<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          class="form-control"
          v-model="newUserParams.name"
        /><br />
        <small>{{ 25 - newUserParams.name.length }} characters remaining</small>
      </div>
      <br />
      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          class="form-control"
          v-model="newUserParams.email"
        />
      </div>
      <br />
      <div class="form-group">
        <label>Password:</label>
        <input
          type="password"
          class="form-control"
          v-model="newUserParams.password"
        />
        <br />
        <small
          v-if="
            newUserParams.password.length > 0 &&
            newUserParams.password.length < 6
          "
          class="text-danger"
          >Must be at least 6 characters</small
        >
        <small v-if="newUserParams.password.length > 20" class="text-danger"
          >Password cannot exceed 20 characters</small
        >
      </div>
      <br />
      <div class="form-group">
        <label>Password confirmation:</label>
        <input
          type="password"
          class="form-control"
          v-model="newUserParams.password_confirmation"
        />
        <br />
        <small
          v-if="newUserParams.password !== newUserParams.password_confirmation"
          class="text-danger"
          >Must match password</small
        >
      </div>
      <br />
      <input
        v-if="
          newUserParams.name.length < 2 ||
          newUserParams.name.length > 25 ||
          newUserParams.password.length < 6 ||
          newUserParams.password.length > 20 ||
          newUserParams.password !== newUserParams.password_confirmation
        "
        type="submit"
        disabled
        class="btn btn-primary"
        value="Submit"
      />
      <input v-else type="submit" class="btn btn-primary" value="Submit" />
    </form>
    <!-- newUserParams: {{ newUserParams }} -->
  </div>
</template>

<style scoped>
.text-danger {
  color: red;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {
        name: "",
        password: "",
        password_confirmation: ""
      },
      errors: []
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$parent.flashMessage = "Successfully signed up!";
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

<template>
  <div class="messages-index">
    <form v-on:submit.prevent="submit()">
      <h1>New Message</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <textarea v-model="newMessageBody" cols="50" rows="5"></textarea>
      </div>

      <input type="submit" value="Submit" />
    </form>
    <div v-for="message in messages" v-bind:key="message.id">
      <p>Created: {{ message.created_at }}</p>
      <p>User: {{ message.user_id }}</p>
      <p>{{ message.body }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ActionCable from "actioncable";

export default {
  data: function () {
    return {
      messages: [],
      newMessageBody: "",
      errors: []
    };
  },
  created: function () {
    axios.get("/messages").then((response) => {
      this.messages = response.data;
    });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: (data) => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        this.messages.unshift(data); // update the messages in real time
      }
    });
  },
  methods: {
    submit: function () {
      var params = {
        body: this.newMessageBody
      };
      axios
        .post("/messages", params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

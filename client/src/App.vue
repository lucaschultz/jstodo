<template>
    <div id="app" class="site-wrapper" v-if="dataFetched">
      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <TheHeader :currentUser="currentUser" :userList="users" @switch="setCurrentID" @response="handleResponse"></TheHeader>
      <TheTodoUser :user="currentUser" @updated-user="updateUsers" @response="handleResponse"></TheTodoUser>
      <footer>
          <div>Entwickelt von <a href="https://github.com/lucaschultz">Luca Schultz</a> and <a href="https://github.com/MrsSnowWhite">Max Sauerzapf</a></div>
          <div>für <em>Web- und XML-Technologien</em> an der <a href="https://www.informatik.uni-bonn.de/de">Universität Bonn</a></div>
      </footer>
      <ErrorOverlay :error="error"></ErrorOverlay>
    </div>
</template>

<script>
import serverURL from './config.mjs';
import TheTodoUser from './components/TheTodoUser.vue';
import TheHeader from './components/TheHeader.vue';
import ErrorOverlay from './components/ErrorOverlay.vue';
import api from './api.mjs';

const connectionError = {
  title: 'ConnectionProblem',
  message: 'An error occured while fetching data from the server, please try again later'
};

export default {
  name: 'App',
  data: function () {
    return {
      error: null,
      dataFetched: false,
      currentID: '_111111111',
      serverURL: serverURL,
      users: [
        {
          user: 'default',
          id: '_111111111',
          lists: []
        }
      ]
    };
  },
  created () {
    api.update(this.users)
      .then(newUsers => {
        this.users = newUsers;
        this.dataFetched = true;
      })
      .catch(err => {
        console.log(err);
        this.error = connectionError;
      });
  },
  computed: {
    currentUser: function () {
      return this.users.find(u => u.id === this.currentID);
    },
  },
  methods: {
    updateUsers: function (user) {
      const index = this.users.findIndex(u => user.id === u.id);
      if (index === -1) {
        this.users.push(user);
      } else {
        Object.assign(this.users[index], user);
      }
    },
    setUserList: function (userList) {
      this.users = userList;
    },
    setCurrentID: function (id) {
      this.currentID = id;
    },
    generateID: function () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    handleResponse: function (response) {
      console.log(response);
      if (response.status === 'ERROR') {
        this.error = response;
      } else {
        api.update(this.users)
          .then(data => {
            this.users = data;
          })
          .catch(err => {
            console.log(err);
            this.error = connectionError;
          });
      }
    },
  },
  components: {
    TheTodoUser,
    TheHeader,
    ErrorOverlay
  }
};
</script>

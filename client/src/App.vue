<template>
  <div id="app" class="site-wrapper">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <TheHeader :currentUser="currentUser" :userList="users" @switch="setCurrentID" @user-list="setUserList"></TheHeader>
    <TheTodoUser :user="currentUser" @updated-user="updateUsers"></TheTodoUser>
    <footer>
        <div>Entwickelt von <a href="https://github.com/lucaschultz">Luca Schultz</a> and <a href="https://github.com/MrsSnowWhite">Max Sauerzapf</a></div>
        <div>für <em>Web- und XML-Technologien</em> an der <a href="https://www.informatik.uni-bonn.de/de">Universität Bonn</a></div>
    </footer>
  </div>
</template>

<script>
import TheTodoUser from './components/TheTodoUser.vue';
import TheHeader from './components/TheHeader.vue';

export default {
  name: 'App',
  data: function () {
    return {
      currentID: '_111111111',
      users: [
        {
          user: 'default',
          id: '_111111111',
          lists: [
            {
              name: 'TestListe',
              id: '6874wd48wef8d',
              items: [
                {
                  name: 'TestItem 1',
                  done: false,
                  cost: 1,
                  due: '2020-06-13',
                  id: 'jfghtfztf'
                },
                {
                  name: 'TestItem 2',
                  done: true,
                  cost: 1,
                  due: '2020-08-12',
                  id: '684fdfhdhsghzd'
                },
              ]
            },
            {
              name: 'Leere Liste',
              id: '87df8ewf7wd5df8',
              items: []
            }
          ]
        }
      ]
    };
  },
  computed: {
    currentUser: function () {
      return this.users.find(u => u.id === this.currentID);
    }
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
    }
  },
  components: {
    TheTodoUser,
    TheHeader
  }
};
</script>

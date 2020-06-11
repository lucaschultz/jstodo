<template>
  <div id="app" class="site-wrapper">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <TheHeader v-bind:currentUser="currentUser.user"></TheHeader>
    <TheTodoUser v-bind:user="currentUser" @updated-user="updateUsers"></TheTodoUser>
  </div>
</template>

<script>
import TheTodoUser from './components/TheTodoUser.vue';
import TheHeader from './components/TheHeader.vue';

export default {
  name: 'App',
  data: function () {
    return {
      currentID: 'g3ruzgb23',
      users: [
        {
          user: 'default',
          id: 'g3ruzgb23',
          lists: [
            {
              name: 'TestListe',
              id: '6874wd48wef8d',
              items: [
                {
                  name: 'TestItem 1',
                  done: false,
                  due: '2020-06-12',
                  id: 'jfghtfztf'
                },
                {
                  name: 'TestItem 1.5',
                  done: true,
                  due: '2020-06-12',
                  id: 'dfkuhf6789'
                },
                {
                  name: 'TestItem 2',
                  done: true,
                  due: '2020-06-12',
                  id: '684fdfhdhsghzd'
                },
                {
                  name: 'TestItem 1.5',
                  done: true,
                  due: '2020-06-12',
                  id: 'dfksduhf6789'
                },
                {
                  name: 'TestItem 2',
                  done: true,
                  due: '2020-06-12',
                  id: '684fddsfsdfhdhsghzd'
                }
              ]
            },
            {
              name: 'Leere Liste',
              id: '87df8ewf7wd5df8',
              items: []
            },
            {
              name: 'Andere Liste',
              id: '8373738740',
              items: [
                {
                  name: 'Wäsche Waschen',
                  done: true,
                  due: '2020-06-12',
                  id: '832637642352'
                },
                {
                  name: 'XML Lernen',
                  done: false,
                  due: '2020-06-12',
                  id: '89378283387498'
                }
              ]
            },
            {
              name: 'Noch eine Liste',
              id: 'jbsd3e7wf',
              items: [
                {
                  name: 'Kochen',
                  done: true,
                  due: '2020-06-12',
                  id: 'fh37hiu78'
                },
                {
                  name: 'Spazieren gehen',
                  done: true,
                  due: '2020-06-12',
                  id: 'febd3z48z7tl'
                }
              ]
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
    }
  },
  components: {
    TheTodoUser,
    TheHeader
  }
};
</script>

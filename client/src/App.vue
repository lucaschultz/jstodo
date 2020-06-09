<template>
  <div id="app" class="site-wrapper">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <TheHeader v-bind:currentUser="currentUser"></TheHeader>
    <TheMainContent v-bind:user="currentLists"></TheMainContent>
  </div>
</template>

<script>
import TheMainContent from './components/TheMainContent.vue';
import TheHeader from './components/TheHeader.vue';

export default {
  name: 'App',
  data: function () {
    return {
      currentUser: 'default',
      mainData: [
        {
          user: 'default',
          lists: [
            {
              name: 'TestListe',
              items: [
                {
                  name: 'TestItem 1',
                  done: false
                },
                {
                  name: 'TestItem 1.5',
                  done: false
                },
                {
                  name: 'TestItem 2',
                  done: true
                },
                {
                  name: 'TestItem 1',
                  done: false
                },
                {
                  name: 'TestItem 1.5',
                  done: false
                },
                {
                  name: 'TestItem 2',
                  done: true
                },
                {
                  name: 'TestItem 1',
                  done: false
                },
                {
                  name: 'TestItem 1.5',
                  done: false
                },
                {
                  name: 'TestItem 2',
                  done: true
                },
                {
                  name: 'TestItem 1',
                  done: false
                },
                {
                  name: 'TestItem 1.5',
                  done: false
                },
                {
                  name: 'TestItem 2',
                  done: true
                },
                {
                  name: 'TestItem 1',
                  done: false
                },
                {
                  name: 'TestItem 1.5',
                  done: false
                },
                {
                  name: 'TestItem 2',
                  done: true
                },
              ]
            },
            {
              name: 'Leere Liste',
              items: []
            }
          ]
        }
      ]
    };
  },
  computed: {
    currentLists: function () {
      const result = this.mainData.filter((u) => {
        return u.user === this.currentUser;
      });
      return result[0];
    }
  },
  components: {
    TheMainContent,
    TheHeader
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>

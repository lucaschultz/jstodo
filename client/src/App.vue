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
              id: '6874wd48wef8d',
              items: [
                {
                  name: 'TestItem 1',
                  done: false,
                  due: '01.01.2020',
                  id: 'jfghtfztf'
                },
                {
                  name: 'TestItem 1.5',
                  done: true,
                  due: '01.01.2020',
                  id: 'dfkuhf6789'
                },
                {
                  name: 'TestItem 2',
                  done: true,
                  due: '01.01.2020',
                  id: '684fdfhdhsghzd'
                }
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

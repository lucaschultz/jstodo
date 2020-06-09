<template>
  <section id="main-content-wrapper">
    <TodoList v-for="list in user.lists" v-bind:key="list.name" v-bind:list="list"></TodoList>
  </section>
</template>

<script>
import TodoList from './TodoList.vue';

export default {
  name: 'MainContent',
  props: {
    user: Object,
  },
  methods: {
    updateList (list) {
      this.$emit('listupdate', list);
    }
  },
  components: {
    TodoList
  }
};
</script>

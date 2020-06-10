<template>
  <section id="main-content-wrapper">
    <TodoList v-for="list in lists" v-bind:key="list.id" v-bind:list="list" @updated-list="updateLists"></TodoList>
    <TodoList v-bind:list="lists[0]"></TodoList>
  </section>
</template>

<script>
import TodoList from './TodoList.vue';

export default {
  name: 'TheTodoUser',
  props: {
    user: Object,
  },
  data: function () {
    return {
      name: this.user.user,
      id: this.user.id,
      lists: this.user.lists
    };
  },
  methods: {
    updateLists: function (list) {
      const index = this.lists.findIndex(l => list.id === l.id);
      if (index === -1) {
        this.lists.push(list);
      } else {
        Object.assign(this.lists[index], list);
      }
    },
    emitUser: function () {
      this.$emit('updated-user', {
        user: this.name,
        id: this.id,
        lists: this.lists
      });
    }
  },
  watch: {
    lists: function () {
      this.emitUser();
    },
    user: {
      deep: true,
      handler (newVal) {
        this.name = newVal.user;
        this.id = newVal.id;
        this.lists = newVal.lists;
      }
    }
  },
  components: {
    TodoList
  }
};
</script>

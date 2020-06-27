<template>
  <main id="main-content-wrapper">
    <TodoList v-for="list in lists" :key="list.id" :list="list" :username="user.user" @edit-list="setEditList" @response="emitResponse"></TodoList>
    <ListEditor :username="name" :list="editList" @response="emitResponse"></ListEditor>
  </main>
</template>

<script>
import TodoList from './TodoList.vue';
import ListEditor from './ListEditor.vue';

export default {
  name: 'TheTodoUser',
  props: {
    user: Object,
  },
  data: function () {
    return {
      name: this.user.user,
      id: this.user.id,
      lists: this.user.lists,
      editList: null
    };
  },
  methods: {
    setEditList: function (list) {
      this.editList = list;
    },
    emitResponse: function (response) {
      this.$emit('response', response);
    }
  },
  watch: {
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
    TodoList,
    ListEditor
  }
};
</script>

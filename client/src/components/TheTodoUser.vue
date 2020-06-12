<template>
  <main id="main-content-wrapper">
    <TodoList v-for="list in lists" v-bind:key="list.id" v-bind:list="list" @update-list="updateLists" @edit-list="setEditList"></TodoList>
    <ListEditor :list="editList" @updated-list="updateLists"></ListEditor>
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
    updateLists: function (list) {
      const index = this.lists.findIndex(l => list.id === l.id);
      if (index === -1) {
        this.lists.push(list);
      } else {
        Object.assign(this.lists[index], list);
      }
      this.editList = null;
    },
    emitUser: function () {
      this.$emit('updated-user', {
        user: this.name,
        id: this.id,
        lists: this.lists
      });
    },
    removeList: function (list) {
      this.lists = this.lists.filter(l => list.id !== l.id);
    },
    setEditList: function (list) {
      this.removeList(list);
      this.editList = list;
    },
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
    TodoList,
    ListEditor
  }
};
</script>

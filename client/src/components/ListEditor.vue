<template>
  <div class="list-editor-wrapper" :class="{ expanded: isExpanded }">
    <div class="edit-wrapper">
      <input type="text" class="new-list-name" placeholder="Listen Titel" v-model="name">
      <TodoList :list="localList" v-disable-all></TodoList>
      <div class="button-wrapper-list">
        <ConfirmButton @click="emitList"></ConfirmButton>
        <CancelButton @click="cancelEdit"></CancelButton>
      </div>
    </div>
    <AddButton @click="newList"></AddButton>
  </div>
</template>

<script>
// import NewListButton from './NewListButton.vue';
import TodoList from './TodoList.vue';
import ConfirmButton from './ConfirmButton.vue';
import CancelButton from './CancelButton.vue';
import AddButton from './AddButton.vue';

export default {
  name: 'ListEditor',
  props: {
    list: Object
  },
  data: function () {
    return {
      name: '',
      id: null,
      items: [],
    };
  },
  computed: {
    isExpanded: function () {
      return this.id !== null;
    },
    localList: function () {
      return {
        id: this.id,
        items: this.items,
        name: this.name,
      };
    }
  },
  methods: {
    generateID: function () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    newList: function () {
      this.id = this.generateID();
    },
    cancelEdit: function () {
      this.id = null;
      this.name = '';
      this.items = [];
    },
    emitList: function () {
      this.$emit('updated-list', this.localList);
      this.cancelEdit();
    }
  },
  watch: {
    list: {
      deep: true,
      handler: function (newVal) {
        this.id = newVal.id;
        this.name = newVal.name;
        this.items = newVal.items;
      }
    }
  },
  directives: {
    'disable-all': {
      inserted: function (el) {
        const tags = ['input', 'button', 'textarea', 'select'];
        tags.forEach(tagName => {
          const nodes = el.getElementsByTagName(tagName);
          for (let i = 0; i < nodes.length; i++) {
            nodes[i].disabled = true;
            nodes[i].tabIndex = -1;
          }
        });
      },
      componentUpdated: function (el) {
        const tags = ['input', 'button', 'textarea', 'select'];
        tags.forEach(tagName => {
          const nodes = el.getElementsByTagName(tagName);
          for (let i = 0; i < nodes.length; i++) {
            nodes[i].disabled = true;
            nodes[i].tabIndex = -1;
          }
        });
      }
    }
  },
  components: {
    TodoList,
    CancelButton,
    ConfirmButton,
    AddButton
  }
};
</script>

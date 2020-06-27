<template>
  <div class="list-editor-wrapper" :class="{ expanded: isExpanded }">
    <div class="edit-wrapper">
      <input type="text" class="new-list-name" placeholder="Listen Titel" v-model="name">
      <TodoList :list="localList" v-disable-all></TodoList>
      <div class="button-wrapper-list">
        <ConfirmButton @click="uploadList"></ConfirmButton>
        <CancelButton @click="cancelList"></CancelButton>
      </div>
    </div>
    <AddButton @click="newList"></AddButton>
  </div>
</template>

<script>
import TodoList from './TodoList.vue';
import ConfirmButton from './ConfirmButton.vue';
import CancelButton from './CancelButton.vue';
import AddButton from './AddButton.vue';
import api from '../api.mjs';

export default {
  name: 'ListEditor',
  props: {
    username: String,
    list: Object
  },
  data: function () {
    return {
      new: false,
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
      this.new = true;
      this.id = this.generateID();
    },
    cancelList: async function () {
      if (!this.new) {
        const response = await api.list.DELETE(this.username, this.list.name);
        this.$emit('response', response);
      }
      this.id = null;
      this.new = false;
      this.name = '';
      this.items = [];
    },
    uploadList: async function () {
      let response;
      if (this.new) {
        response = await api.list.ADD(this.username, this.name);
      } else {
        response = await api.list.RENAME(this.username, this.list.name, this.name);
      }
      this.$emit('response', response);
      this.id = null;
      this.new = false;
      this.items = [];
      this.name = '';
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

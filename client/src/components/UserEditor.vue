<template>
  <div :class="{ current: isCurrent, expanded: isExpanded }" class="user-tile user-editor">
    <AddButton @click="newUser"></AddButton>
    <input type="text" v-model="name" placeholder="Name">
    <ConfirmButton @click="uploadUser"></ConfirmButton>
    <CancelButton @click="cancelUser"></CancelButton>
  </div>
</template>

<script>
import ConfirmButton from './ConfirmButton.vue';
import CancelButton from './CancelButton.vue';
import AddButton from './AddButton.vue';
import api from '../api.mjs';

export default {
  name: 'TodoList',
  props: {
    user: Object,
    isCurrent: Boolean
  },
  data: function () {
    return {
      new: false,
      name: '',
      id: null,
      lists: [],
    };
  },
  computed: {
    isExpanded: function () {
      return this.id !== null;
    }
  },
  methods: {
    generateID () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    newUser: function () {
      this.id = this.generateID();
      this.new = true;
    },
    cancelUser: async function () {
      if (!this.new) {
        const response = await api.user.DELETE(this.user.user);
        this.$emit('response', response);
      }
      this.new = false;
      this.id = null;
      this.name = '';
      this.lists = [];
    },
    uploadUser: async function () {
      let response;
      if (this.new) {
        response = await api.user.ADD(this.name);
      } else {
        response = await api.user.RENAME(this.user.user, this.name);
      }
      this.$emit('response', response);
      this.new = false;
      this.id = null;
      this.name = '';
      this.lists = [];
    }

  },
  watch: {
    user: {
      deep: true,
      handler: function (newVal) {
        this.id = newVal.id;
        this.name = newVal.user;
        this.lists = newVal.lists;
      }
    }
  },
  components: {
    ConfirmButton,
    CancelButton,
    AddButton,
  }
};
</script>

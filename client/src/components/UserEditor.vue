<template>
  <div :class="{ current: isCurrent, expanded: isExpanded }" class="user-tile user-editor">
    <AddButton @click="newUser"></AddButton>
    <input type="text" v-model="name" placeholder="Name">
    <ConfirmButton @click="emitUser"></ConfirmButton>
    <CancelButton @click="cancelUser"></CancelButton>
  </div>
</template>

<script>
import ConfirmButton from './ConfirmButton.vue';
import CancelButton from './CancelButton.vue';
import AddButton from './AddButton.vue';

export default {
  name: 'TodoList',
  props: {
    user: Object,
    isCurrent: Boolean
  },
  data: function () {
    return {
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
    },
    cancelUser: function () {
      this.id = null;
      this.name = '';
      this.lists = [];
      this.$emit('cancelled');
    },
    emitUser: function () {
      this.$emit('user', {
        user: this.name,
        id: this.id,
        lists: this.lists,
      });
      this.cancelUser();
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
    AddButton
  }
};
</script>

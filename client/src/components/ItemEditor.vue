<template>
  <form :class="{ expanded: isExpanded }" class="item-editor">
    <AddButton @click="newItem"></AddButton>
    <div class="field-wrapper">
      <input type="checkbox" disabled v-model="done">
      <input v-model="name" placeholder="Todo" class="new-todo-name">
      <div class="break"></div>
      <input type="date" class="new-todo-due" v-model="deadline" min="2020-01-01" placeholder="JJJJ-MM-TT">
      <input type="number" class="new-todo-cost" v-model="workloadFactor" min="0" placeholder="Dauer">
    </div>
    <div class="button-wrapper">
      <ConfirmButton @click="uploadItem"></ConfirmButton>
      <CancelButton @click="cancelItem"></CancelButton>
    </div>
  </form>
</template>

<script>
import ConfirmButton from './ConfirmButton.vue';
import CancelButton from './CancelButton.vue';
import AddButton from './AddButton.vue';
import api from '../api.mjs';

export default {
  name: 'ItemEditor',
  props: {
    item: Object,
    listname: String,
    username: String
  },
  data: function () {
    return {
      new: false,
      name: '',
      id: null,
      deadline: '',
      done: false,
      workloadFactor: 0,
    };
  },
  computed: {
    isExpanded: function () {
      return this.id !== null;
    },
    localItem: function () {
      return {
        name: this.name,
        done: this.done,
        workloadFactor: Number.parseInt(this.workloadFactor),
        deadline: this.deadline
      };
    }
  },
  methods: {
    generateID: function () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    newItem: function () {
      this.new = true;
      this.id = this.generateID();
    },
    cancelItem: async function () {
      if (!this.new) {
        const response = await api.item.DELETE(this.username, this.listname, this.item.name);
        this.$emit('response', response);
      }
      this.new = false;
      this.id = null;
      this.done = false;
      this.name = '';
      this.deadline = '';
      this.workloadFactor = 0;
    },
    uploadItem: async function () {
      let response;
      if (this.new) {
        response = await api.item.ADD(this.username, this.listname, this.localItem);
      } else {
        response = await api.item.UPDATE(this.username, this.listname, this.item.name, this.localItem);
      }
      this.$emit('response', response);
      this.new = false;
      this.id = null;
      this.done = false;
      this.name = '';
      this.deadline = '';
      this.workloadFactor = 0;
    }
  },
  watch: {
    item: {
      deep: true,
      handler: function (newVal) {
        this.id = newVal.id;
        this.done = newVal.done;
        this.name = newVal.name;
        this.deadline = newVal.deadline;
        this.workloadFactor = newVal.workloadFactor;
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

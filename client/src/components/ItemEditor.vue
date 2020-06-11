<template>
  <form :class="{ expanded: isExpanded }">
    <AddButton @click="newItem"></AddButton>
    <div class="field-wrapper">
      <input type="checkbox" disabled v-model="done">
      <input v-model="name" placeholder="Todo" class="new-todo-name">
      <div class="break"></div>
      <input type="date" class="new-todo-due" v-model="due" min="2020-01-01" placeholder="JJJJ-MM-TT">
    </div>
    <div class="button-wrapper">
      <ConfirmButton @click="emitItem"></ConfirmButton>
      <CancelButton @click="cancelEdit"></CancelButton>
    </div>
  </form>
</template>

<script>
import ConfirmButton from './ConfirmButton.vue';
import CancelButton from './CancelButton.vue';
import AddButton from './AddButton.vue';

export default {
  name: 'ItemEditor',
  props: {
    item: Object
  },
  data: function () {
    return {
      name: '',
      id: null,
      due: '',
      done: false
    };
  },
  computed: {
    isExpanded: function () {
      return this.id !== null;
    }
  },
  methods: {
    generateID: function () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    newItem: function () {
      this.id = this.generateID();
    },
    cancelEdit: function () {
      this.id = null;
      this.done = false;
      this.name = '';
      this.due = '';
    },
    emitItem: function () {
      this.$emit('updated-item', {
        id: this.id,
        done: this.done,
        name: this.name,
        due: this.due
      });
      this.cancelEdit();
    }
  },
  watch: {
    item: {
      deep: true,
      handler: function (newVal) {
        this.id = newVal.id;
        this.done = newVal.done;
        this.name = newVal.name;
        this.due = newVal.due;
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

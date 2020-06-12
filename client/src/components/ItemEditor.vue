<template>
  <form :class="{ expanded: isExpanded }" class="item-editor">
    <AddButton @click="newItem"></AddButton>
    <div class="field-wrapper">
      <input type="checkbox" disabled v-model="done">
      <input v-model="name" placeholder="Todo" class="new-todo-name">
      <div class="break"></div>
      <input type="date" class="new-todo-due" v-model="due" min="2020-01-01" placeholder="JJJJ-MM-TT">
      <input type="number" class="new-todo-cost" v-model="cost" min="0" placeholder="Dauer">
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
      done: false,
      cost: null,
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
      this.cost = 0;
    },
    emitItem: function () {
      this.$emit('updated-item', {
        id: this.id,
        done: this.done,
        name: this.name,
        due: this.due,
        cost: this.cost
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
        this.cost = newVal.cost;
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

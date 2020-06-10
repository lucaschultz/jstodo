<template>
    <ul>
        <li class="todo-item">
          <input type="checkbox" :id="extended" v-model="done">
          <div class="item-name">{{ name }}</div>
          <EditButton @click="editItem"></EditButton>
          <div class="break"></div>
          <div class="item-due">{{ due }}</div>
        </li>
    </ul>
</template>

<script>
import EditButton from './EditButton.vue';

export default {
  name: 'TodoList',
  props: {
    item: Object
  },
  methods: {
    generateID () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    updateItem () {
      this.$emit('updated-item', {
        name: this.name,
        done: this.done,
        due: this.due,
        id: this.id
      });
    },
    editItem () {
      this.$emit('edit-item', {
        name: this.name,
        done: this.done,
        due: this.due,
        id: this.id
      });
    }
  },
  data: function () {
    return {
      name: this.item.name,
      done: this.item.done,
      due: this.item.due,
      id: this.item.id,
      extended: this.item.id + this.generateID(),
    };
  },
  watch: {
    done: function () {
      this.updateItem();
    },
    item: {
      deep: true,
      handler (newVal) {
        this.name = newVal.name;
        this.done = newVal.done;
        this.due = newVal.due;
        this.id = newVal.id;
        this.extended = newVal.id + this.generateID();
      }
    }
  },
  components: {
    EditButton,
  }
};
</script>

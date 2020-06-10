<template>
  <form>
    <div class="fiel-wrapper">
      <div class="todo-check"></div>
      <input v-model="name" placeholder="edit me" class="new-todo-name">
      <div class="break"></div>
      <input type="date" class="new-todo-due" id="start" value="" min="2020-01-01">
    </div>
    <div class="button-wrapper">
      <EditButton></EditButton>
      <EditButton></EditButton>
    </div>
  </form>
</template>

<script>
import EditButton from './EditButton.vue';

export default {
  name: 'ItemEditor',
  props: {
    item: Object
  },
  data: function () {
    return {
      name: this.item.name,
    };
  },
  components: {
    EditButton
  }
};
</script>

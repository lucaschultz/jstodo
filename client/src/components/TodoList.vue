<template>
  <div class="todo-list-wrapper">
    <div class="todo-list-content">
      <div class="list-header-wrapper">
        <h4 class="list-title">{{ list.name }}</h4>
        <div class="progress-wrapper">
          <div class="progress-bar-outer">
            <div class="progress-bar-inner"></div>
          </div>
          <span>60%</span>
        </div>
      </div>
      <ul>
        <li v-for="item in openItems" v-bind:item="item" v-bind:key="item.name">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    list: Object
  },
  computed: {
    openItems: function () {
      return this.list.items.filter((u) => {
        return !u.done;
      });
    },
    closedItems: function () {
      return this.list.items.filter((u) => {
        return u.done;
      });
    }
  }
};
</script>

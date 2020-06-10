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
        <TodoItem v-for="item in items" v-bind:item="item" v-bind:key="item.id" @updated-item="updateItems"></TodoItem>
      </ul>
      <div class="list-editor">
        input
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  props: {
    list: Object
  },
  data: function () {
    return {
      name: this.list.name,
      id: this.list.id,
      items: this.list.items,
    };
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
  },
  methods: {
    updateItems: function (item) {
      const index = this.items.findIndex(i => item.id === i.id);
      if (index === -1) {
        this.items.push(item);
      } else {
        Object.assign(this.items[index], item);
      }
    },
    emitList: function () {
      this.$emit('updated-list', {
        items: this.items,
        name: this.name,
        id: this.id
      });
    }
  },
  watch: {
    items: function () {
      this.emitList();
    },
    list: {
      deep: true,
      handler (newVal) {
        this.name = newVal.name;
        this.id = newVal.id;
        this.items = newVal.items;
      }
    }
  },
  components: {
    TodoItem
  }
};
</script>

<template>
  <div class="todo-list-wrapper">
    <div class="todo-list-content">
      <div class="list-header-wrapper">
        <h4 class="list-title">{{ list.name }}</h4>
        <EditButton @click="editList"></EditButton>
        <div class="break"></div>
        <ProgressBar :progress="listProgress"></ProgressBar>
      </div>
      <ul class="item-list">
        <TodoItem v-for="item in items" v-bind:item="item" v-bind:key="item.id" @updated-item="updateItems" @edit-item="setEditItem"></TodoItem>
      </ul>
      <ItemEditor :item="editItem" @updated-item="updateItems"></ItemEditor>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
import ItemEditor from './ItemEditor.vue';
import EditButton from './EditButton.vue';
import ProgressBar from './ProgressBar.vue';

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
      editItem: null
    };
  },
  computed: {
    openItems: function () {
      return this.list.items.filter((u) => {
        return !u.done;
      });
    },
    doneItems: function () {
      return this.list.items.filter((u) => {
        return u.done;
      });
    },
    listProgress: function () {
      let openCost = 0;
      let doneCost = 0;
      this.openItems.forEach(item => {
        openCost += this.isNumber(item.cost) ? parseFloat(item.cost) : 0;
      });
      this.doneItems.forEach(item => {
        doneCost += this.isNumber(item.cost) ? parseFloat(item.cost) : 0;
      });
      const totalCost = openCost + doneCost;
      console.log(doneCost);
      console.log(openCost);
      return totalCost !== 0 ? Math.round(doneCost / (totalCost / 100)) : 0;
    }
  },
  methods: {
    isNumber: function (n) {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0)
    },
    updateItems: function (item) {
      const index = this.items.findIndex(i => item.id === i.id);
      if (index === -1) {
        this.items.push(item);
      } else {
        Object.assign(this.items[index], item);
      }
      this.editItem = null;
    },
    removeItem: function (item) {
      this.items = this.items.filter(i => item.id !== i.id);
    },
    setEditItem: function (item) {
      this.removeItem(item);
      this.editItem = item;
    },
    editList () {
      this.$emit('edit-list', {
        items: this.items,
        name: this.name,
        id: this.id
      });
    },
    updateList: function () {
      this.$emit('update-list', {
        items: this.items,
        name: this.name,
        id: this.id
      });
    }
  },
  watch: {
    items: function () {
      this.updateList();
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
    TodoItem,
    ItemEditor,
    EditButton,
    ProgressBar
  }
};
</script>

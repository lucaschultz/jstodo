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
        <TodoItem v-for="item in items" :listname="list.name" :username="username" :item="item" :key="item.name" @edit-item="setEditItem" @response="emitResponse"></TodoItem>
      </ul>
      <ItemEditor :listname="list.name" :username="username" :item="editItem" @response="emitResponse"></ItemEditor>
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
    list: Object,
    username: String
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
        openCost += this.isNumber(item.workloadFactor) ? parseFloat(item.workloadFactor) : 0;
      });
      this.doneItems.forEach(item => {
        doneCost += this.isNumber(item.workloadFactor) ? parseFloat(item.workloadFactor) : 0;
      });
      const totalCost = openCost + doneCost;
      return totalCost !== 0 ? Math.round(doneCost / (totalCost / 100)) : 0;
    }
  },
  methods: {
    isNumber: function (n) {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    },
    setEditItem: function (item) {
      this.editItem = item;
    },
    editList () {
      this.$emit('edit-list', {
        items: this.items,
        name: this.name,
        id: this.id
      });
    },
    emitResponse: function (response) {
      this.$emit('response', response);
    }
  },
  watch: {
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

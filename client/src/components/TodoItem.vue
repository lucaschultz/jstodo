<template>
    <ul>
        <li class="todo-item">
          <input type="checkbox" :id="id" v-model="done">
          <label class="todo-check" :for="id"></label>
          <!-- <div class="item-info-wrapper"> -->
          <div class="item-name">{{ name }}</div>
          <!-- </div> -->
          <button class="edit-button">
            <svg width="11px" height="3px" viewBox="0 0 11 3" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g class="edit-button-symbol" fill="black">
                <circle id="Oval" cx="1.5" cy="1.5" r="1.5"></circle>
                <circle id="Oval-Copy" cx="5.5" cy="1.5" r="1.5"></circle>
                <circle id="Oval-Copy-2" cx="9.5" cy="1.5" r="1.5"></circle>
              </g>
            </svg>
          </button>
          <div class="break"></div>
          <div class="item-due">{{ due }}</div>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    item: Object
  },
  methods: {
    generateID () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    emitItem (item) {
      if (item.id === null) {
        item.id = this.generateID();
      }
      this.$emit('item', item);
    }
  },
  data: function () {
    return {
      name: this.item.name,
      done: this.item.done,
      due: '2020-10-12',
      id: this.item.id,
      empty: {
        name: 'Was gibts zu tun?',
        due: 'dd.mm.yyyy',
        done: false,
        id: null
      }
    };
  },
};
</script>

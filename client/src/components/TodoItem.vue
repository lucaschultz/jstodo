<template>
    <ul>
        <li class="todo-item">
          <input type="checkbox" :id="extended" v-model="done">
          <div class="item-name">{{ name }}</div>
          <EditButton @click="editItem"></EditButton>
          <div class="break"></div>
          <div class="item-due" v-if="dueIn">{{ dueIn }}</div>
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
  data: function () {
    return {
      name: this.item.name,
      done: this.item.done,
      due: this.item.due,
      id: this.item.id,
      cost: this.item.cost,
      extended: this.item.id + this.generateID(),
    };
  },
  computed: {
    dueIn: function () {
      if (!this.due) {
        return null;
      } else {
        const matches = this.due.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
        let dateStr;
        if (matches) {
          dateStr = matches[0];
        } else {
          return null;
        }
        const now = Date.now();
        const timeDelta = new Date(dateStr) - now;
        return this.timeDeltaConverter(timeDelta);
      }
    },
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
        cost: this.cost,
        id: this.id
      });
    },
    editItem () {
      this.$emit('edit-item', {
        name: this.name,
        done: this.done,
        due: this.due,
        cost: this.cost,
        id: this.id
      });
    },
    timeDeltaConverter: function (t) {
      const cd = 24 * 60 * 60 * 1000;
      const ch = 60 * 60 * 1000;
      let d = Math.floor(t / cd);
      let h = Math.floor((t - d * cd) / ch);
      let m = Math.round((t - d * cd - h * ch) / 60000);
      function pad (n) { return n < 10 ? '0' + n : n; };
      if (m === 60) {
        h++;
        m = 0;
      }
      if (h === 24) {
        d++;
        h = 0;
      }
      if (d === 0) {
        return 'Morgen';
      } else if (d === -1) {
        return 'Heute';
      } else {
        return `${d}t ${pad(h)}h ${pad(m)}min`;
      }
    }
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
        this.cost = newVal.cost;
        this.extended = newVal.id + this.generateID();
      }
    }
  },
  components: {
    EditButton,
  }
};
</script>

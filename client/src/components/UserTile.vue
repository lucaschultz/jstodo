<template>
  <div :class="{ current: isCurrent }" class="user-tile">
    <span @click="$emit('switch', userID)" class="user-name" :class="{ default: isDefault }">{{ name }}</span>
    <EditButton @click="$emit('edit', userID)" v-if="!isDefault"></EditButton>
  </div>
</template>

<script>
import EditButton from './EditButton.vue';

export default {
  name: 'TodoList',
  props: {
    userName: String,
    userID: String,
    isCurrent: Boolean
  },
  computed: {
    name: function () {
      return this.userName === 'default' ? 'Standard' : this.userName;
    },
    isDefault: function () {
      return this.userName === 'default';
    }
  },
  components: {
    EditButton
  }
};
</script>

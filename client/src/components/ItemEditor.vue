<template>
  <form>
    <input v-model="name" placeholder="edit me">
  </form>
</template>

<script>
export default {
  name: 'ItemEditor',
  props: {
    item: Object
  },
  data: function () {
    return {
      name: this.item.name,
    };
  }
};
</script>

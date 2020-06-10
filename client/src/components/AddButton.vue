<template>
    <button class="add-button big-button" @click="onClick($event)">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="big-button-symbol" fill-rule="evenodd" clip-rule="evenodd" d="M10.5 20.5C10.5 21.33 11.17 22 12 22C12.83 22 13.5 21.33 13.5 20.5V13.5H20.5C21.33 13.5 22 12.83 22 12C22 11.17 21.33 10.5 20.5 10.5H13.5V3.5C13.5 2.67 12.83 2 12 2C11.17 2 10.5 2.67 10.5 3.5V10.5H3.5C2.67 10.5 2 11.17 2 12C2 12.83 2.67 13.5 3.5 13.5H10.5V20.5Z" fill="#000"></path></svg>
    </button>
</template>

<script>
export default {
  name: 'AddButton',
  methods: {
    onClick: function (event) {
      if (event) {
        event.preventDefault();
      }
      this.$emit('click');
    }
  }
};
</script>

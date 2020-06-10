<template>
    <button class="edit-button simple-button" @click="onClick($event)">
      <svg width="11px" height="3px" viewBox="0 0 11 3" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g class="simple-button-symbol" fill="#000">
          <circle id="Oval" cx="1.5" cy="1.5" r="1.2"></circle>
          <circle id="Oval-Copy" cx="5.5" cy="1.5" r="1.2"></circle>
          <circle id="Oval-Copy-2" cx="9.5" cy="1.5" r="1.2"></circle>
        </g>
      </svg>
    </button>
</template>

<script>
export default {
  name: 'EditButton',
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

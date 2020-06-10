<template>
    <button class="edit-button simple-button" @click="$emit('edit-button')">
      <svg width="11px" height="3px" viewBox="0 0 11 3" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g class="edit-button-symbol button-symbol" fill="black">
          <circle id="Oval" cx="1.5" cy="1.5" r="1.5"></circle>
          <circle id="Oval-Copy" cx="5.5" cy="1.5" r="1.5"></circle>
          <circle id="Oval-Copy-2" cx="9.5" cy="1.5" r="1.5"></circle>
        </g>
      </svg>
    </button>
</template>

<script>
export default {
  name: 'EditButton',
};
</script>

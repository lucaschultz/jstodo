<template>
    <button class="cancel-button simple-button" @click="onClick($event)">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="simple-button-symbol" fill-rule="evenodd" clip-rule="evenodd" d="M14.1201 12.0025L19.0601 7.0625C19.6501 6.4725 19.6501 5.5225 19.0601 4.9425C18.4701 4.3525 17.5201 4.3525 16.9401 4.9425L12.0001 9.8825L7.06006 4.9425C6.47006 4.3525 5.52006 4.3525 4.94006 4.9425C4.35006 5.5325 4.35006 6.4825 4.94006 7.0625L9.88006 12.0025L4.94006 16.9425C4.35006 17.5325 4.35006 18.4825 4.94006 19.0625C5.23006 19.3525 5.62006 19.5025 6.00006 19.5025C6.38006 19.5025 6.77006 19.3525 7.06006 19.0625L12.0001 14.1225L16.9401 19.0625C17.2301 19.3525 17.6201 19.5025 18.0001 19.5025C18.3801 19.5025 18.7701 19.3525 19.0601 19.0625C19.6501 18.4725 19.6501 17.5225 19.0601 16.9425L14.1201 12.0025Z" fill="#000"></path></svg>
    </button>
</template>

<script>
export default {
  name: 'CancelButton',
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

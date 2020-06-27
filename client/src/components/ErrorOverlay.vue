<template>
  <div class="overlay" v-if="visible">
    <div class="error-dialogue">
      <h4>Server Fehler</h4>
      <div class="error-message">
        <h5>{{ title }}</h5>
        <p>{{ message }}</p>
      </div>
      <CancelButton @click="dismiss"></CancelButton>
    </div>
  </div>
</template>

<script>
import CancelButton from './CancelButton.vue';

export default {
  name: 'ErrorOverlay',
  props: {
    error: Object
  },
  data: function () {
    return {
      visible: false
    };
  },
  methods: {
    dismiss: function () {
      this.visible = false;
    }
  },
  computed: {
    title: function () {
      return (this.error === null) ? '' : this.error.title;
    },
    message: function () {
      return (this.error === null) ? '' : this.error.message;
    }
  },
  watch: {
    error: {
      deep: true,
      handler: function () {
        this.visible = true;
      }
    }
  },
  components: {
    CancelButton
  }
};
</script>

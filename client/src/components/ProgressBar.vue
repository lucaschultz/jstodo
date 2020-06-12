<template>
  <div class="progress-wrapper">
    <div class="progress-bar-outer">
      <div class="progress-bar-inner" :style="style"></div>
    </div>
    <span>{{ progress }}%</span>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: Number,
  },
  computed: {
    style: function () {
      return '--progress: ' + this.progress + '%;';
    }
  }
};
</script>

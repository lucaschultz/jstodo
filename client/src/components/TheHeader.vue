<template>
  <header>
    <div id="header-content-wrapper">
      <div id="user-dialogue-wrapper">
        <div id="user-image"></div>
        <p id="user-name">{{ currentUser }}</p>
        <button id="switch-user-button">Benutzer Wechseln</button>
      </div>
      <h1>JS Todo</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data: function () {
    return {
      colors: ['#fed402', '#4aaea4', '#d2c78d', '#4bbd5e'],
    };
  },
  props: {
    currentUser: String,
    userList: Array
  }
};
</script>

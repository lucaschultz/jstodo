<template>
  <header>
    <div id="header-content-wrapper">
      <div class="users-wrapper">
        <UserTile v-for="user in users" :key="user.id" :userID="user.id" :userName="user.user" :isCurrent="isCurrent(user)" @switch="$emit('switch', user.id)" @edit="setEditUser"></UserTile>
        <UserEditor @user="addUser" @cancelled="cancelledEdit" :user="editUser"></UserEditor>
      </div>
      <h1>JS Todo</h1>
    </div>
  </header>
</template>

<script>
import UserTile from './UserTile.vue';
import UserEditor from './UserEditor.vue';

export default {
  name: 'TheHeader',
  props: {
    currentUser: Object,
    userList: Array
  },
  data: function () {
    return {
      users: this.userList,
      editUser: null,
    };
  },
  methods: {
    isCurrent: function (user) {
      return user.id === this.currentUser.id;
    },
    addUser: function (user) {
      const index = this.users.findIndex(u => user.id === u.id);
      if (index === -1) {
        this.users.push(user);
      } else {
        Object.assign(this.users[index], user);
      }
      this.editUser = null;
      this.emitUserList();
    },
    cancelledEdit: function () {
      this.editUser = null;
      this.emitUserList();
    },
    setEditUser: function (id) {
      this.editUser = this.users.find(u => u.id === id);
      this.removeUser(id);
    },
    removeUser: function (id) {
      this.users = this.users.filter(u => u.id !== id);
    },
    emitUserList: function () {
      this.$emit('user-list', this.users);
    }
  },
  watch: {
    userList: {
      deep: true,
      handler: function (newVal) {
        this.users = newVal;
      }
    }
  },
  components: {
    UserTile,
    UserEditor
  }
};
</script>

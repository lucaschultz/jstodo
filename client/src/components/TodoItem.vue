<template>
  <div class="list-wrapper">
      <TodoList v-for="list in lists" v-bind:list="list"></TodoList>
  </div>
</template>
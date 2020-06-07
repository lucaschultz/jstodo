<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Web- und XML-Technologien 2020</h2>
    <p>
      Herzlichen Glückwunsch! <br>
      VueJs funktioniert! <br>
      Viel Spaß!
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
p {
  line-height: 2em;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

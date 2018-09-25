<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
  width: 0;
  height: 0;
}

.fll {
  float: left;
}

.form-500 {
  width: 500px;
}

.img-item {
  width: 80px;
  height: 100px
}
</style>

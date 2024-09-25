<template>
  <nav class="p-3">
    <router-link to="/"><img alt="Vue logo" style="width: 20px;" src="./assets/logo.png"></router-link> 
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}

tr{
  cursor: pointer;
}
</style>

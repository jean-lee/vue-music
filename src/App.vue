<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'

export default {
  // name: 'app',
  components: {
    MHeader, Tab
  }
}
</script>

<template>
  <div id="app">
    <MHeader></MHeader>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<style>
</style>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'

export default {
  // name: 'app',
  components: {
    MHeader, Tab, Player
  }
}
</script>

<template>
  <div id="app">
    <MHeader></MHeader>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<style>
</style>

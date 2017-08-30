<script>
import {mapGetters} from 'vuex'

export default {
  name: 'player',
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist'
    ])
  }
}
</script>

<template>
<div class="player" v-show="playlist.length>0">
  <div class="normal-player" v-show="fullScreen">播放器</div>
  <div class="mini-player" v-show="!fullScreen"></div>
</div>
</template>

<style lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      top: 0
      right: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
      position: relative

</style>

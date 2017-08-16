<script>
export default {
  name: 'loading',
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>

<template>
<div class="loading">
  <img width="24" height="24" src="./loading.gif">
  <p class="desc">{{title}}</p>
</div>
</template>

<style lang="stylus">
  @import '~common/stylus/variable'

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 10px
      font-size: $font-size-small
      color: $color-text-l
</style>

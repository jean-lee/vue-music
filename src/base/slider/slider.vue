<script>
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: { // 设置是否可以循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: { // 自动轮播间隔
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() { // dom ready 初始化-避免better-scroll初始化无法滚动
      setTimeout(() => {
        this._setSliderWidth()
      // this._initDots()
        this._initSlider()

      // if (this.autoPlay) {
      //   this._play()
      // }
      }, 200)
    },
    methods: {
      _setSliderWidth() { // isResize
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // if (this.loop && isResize) {
        //   width += 2 * sliderWidth
        // }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 横向滚动
          scrollY: false,
          momentum: false, // 惯性-禁止
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            this._play()
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if (this.loop) {
            clearTimeout(this.timer)
          }
        })
      },
      initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
}
</script>

<template>
<div class="slider" ref="slider">
  <div class="slider-group" ref="sliderGroup">
    <slot></slot>
  </div>
  <div lcass="dots">
    <span class="dot" :class="{active: currentIndex === index }" v-for="(item, index) in dots"></span>
  </div>
</div>
</template>

<style lang="stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow:hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow : hidden
          text-decoration: none
        img
          display: block
          width: 100%
    // .dots
    //   position: absolute
    //   right: 0
    //   left:0
    //   bottom: 12px
    //   text-align: center
    //   font-size: 0
    //   .dot
    //     display: block
    //     margin: 0 4px
    //     width:8px
    //     height: 8px
    //     border-radius: 50%
    //     background-color: $color-text-l
    //     &.active
    //       width: 20px
    //       border-radius: 5px
    //       background-color: $color-text-l




</style>
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
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => { // 页面窗口切换，重新获取视口宽度
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) { // 循环且非刷新状态
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 横向滚动
          scrollY: false,
          momentum: false, // 惯性-禁止
          snap: true,
          snapLoop: this.loop, // 是否可以无缝循环轮播
          snapThreshold: 0.3, // 用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
          snapSpeed: 400
          // click: true // 手机模式下，BScroll内部的实现时会阻止默认click，重新派发点击事件，而此click会被fastsclick监听，被阻止，导致页面无法跳转
        })

        this.slider.on('scrollEnd', () => { // 切换到下一张时，派发事件
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) { // 循环模式下，会对第1、2个元素进行拷贝
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            this._play()
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if (this.loop) {
            clearTimeout(this.timer) // 避免手动拖动时，计时器到时间自动滚动
          }
        })
      },
      _initDots() {
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
    },
    destroyed() {
      clearTimeout(this.timer)
    }
}
</script>

<template>
<div class="slider" ref="slider">
  <div class="slider-group" ref="sliderGroup">
    <slot></slot>
  </div>
  <div class="dots">
    <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="index"></span>
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
    .dots
      position: absolute
      right: 0
      left:0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width:8px
        height: 8px
        border-radius: 50%
        background-color: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background-color: $color-text-l




</style>

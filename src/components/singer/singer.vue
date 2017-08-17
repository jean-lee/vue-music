<script>
import {getSingerList} from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  name: 'singer',
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          // this.singers = res.data.list
          this.singers = this._normaLizeSinger(res.data.list)
          // console.log(this._normaLizeSinger(this.singers))
        }
      })
    },

    _normaLizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }

      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) { // 此处singArray前10条定义为热门数据
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }

        const key = item.Findex // Findex = A/B/C/D...

        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })

      // return map
      // 为了得到严格的有序列表，对map进行处理
      let hot = []
      let ret = []

      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>

<template>
<div>

</div>
</template>

<style lang="stylus">
</style>

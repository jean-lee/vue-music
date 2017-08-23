import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex) // 注册vuex插件

// 开发环境 npm run devs时，NODE_ENV=dev ,build 时为生产环境职位production
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({ // 实例
  actions,
  getters,
  state,
  mutations,
  strict: debug, // 调试工具，检测state的修改来源是否为mutation，否则包警告，不建议先声环境使用，耗能
  plugins: debug ? [createLogger()] : []
})

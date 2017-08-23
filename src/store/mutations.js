import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) { // singer-->提交时传的payload参数
    state.singer = singer
  }
}

// 使用mutation-types是为了书写方便，方便eslint等工具检测书写是否正确
export default mutations

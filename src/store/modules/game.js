import { listgames,} from '@/api/game.js'
import { getToken } from '@/utils/auth'

const game = {
  state: {
    token: getToken(),
    gameList: [], // 游戏列表
  },

  mutations: {
    SET_LIST: (state, list) => {
      state.gameList = list;
    },
  },

  actions: {
    // 获取数据列表
    Listgames({ commit }, params) {
      return new Promise((resolve, reject) => {
        listgames(params).then(res => {
          console.log('hahhha', res);
          commit('SET_TOKEN', res.data.list)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default game

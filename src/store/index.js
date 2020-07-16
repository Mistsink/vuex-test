import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //存储状态
    state: {
        num: 0
    },
    getters: {
        getStr () {
            return 'get str'
        }
    },
    actions: {
        con ({commit, dispatch}, payload) {
            setTimeout(() => {
                commit('con', payload)
            }, 1000)
        }
    },
    mutations: {
        con (state, payload) {
            console.log(state, payload)
        }
    }
})
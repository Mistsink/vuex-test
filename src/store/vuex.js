let Vue 

const install = v => {
    Vue = v;

    // init $store
    // 初始化时，只有根组件的参数($options)上有store类
    Vue.mixin({
        beforeCreate () {
            if (this.$options && this.$options.store) {
                // root
                this.$store = this.$options.store;
            } else {
                // childs
                console.log(this)
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
}

/**调用形式： 
 * {{this.$store.state.num}}
 * {{this.$store.getters.getStr}}
 * this.$store.commit('con', 'payload')
 * actions中 commit('con', payload) && 组件方法中 this.$store.dispatch('con', 'dispatch')
 * 
 */
class Store{
    constructor (options) {
        console.log(options)

        // init state
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })

        //init getters
        let getters = options.getters || {}
        this.getters = {}
        Object.keys(getters).forEach((key) => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state)
                }
            })
        })

        // init mutations
        // 调用形式 this.$store.commit('con', 'payload')
        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach((key) => {
            this.mutations[key] = payload => {
                mutations[key](this.state, payload)
            }
        })

        // init actions
        // 调用形式 actions中 commit('con', payload) && 组件方法中 this.$store.dispatch('con', 'dispatch')
        let actions = options.actions || {}
        this.actions = {}
        Object.keys(actions).forEach(key => {
            this.actions[key] = payload => {
                actions[key](this, payload)
            }
        })
    }

    // 调用形式 actions中 commit('con', payload) && 组件方法中 this.$store.dispatch('con', 'dispatch')
    dispatch (method, payload) {
        this.actions[method](payload)
    }


    // 调用形式this.$store.commit('con', 'payload')
    // 用箭头函数绑定this
    commit = (method, payload) => {
        this.mutations[method](payload);
    }


    // 调用形式：{{this.$store.state.num}}
    //init -->get-- state
    get state () {
        return this.vm.state
    }
}
export default {
    install,
    Store
}
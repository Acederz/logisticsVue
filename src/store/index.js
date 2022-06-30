import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);const store = new Vuex.Store({
    state: {
        account: localStorage.getItem('account') ? localStorage.getItem('account') : null,
        //若localSorage存在token，将值赋给Vuex.state.token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    },
    mutations: {
        setAccount(state, account) {
            state.account = account
            localStorage.setItem('account', account)
        },
        setToken(state, token) {
            localStorage.setItem('token', token)
            state.token = token
        },
        logout(state) {
            localStorage.removeItem('token')
            state.token = null
            localStorage.removeItem('account')
            state.account = null
        }
    }
  })

  export default store;
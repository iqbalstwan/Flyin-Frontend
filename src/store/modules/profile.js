import axios from 'axios'

export default {
  state: {
    profile: {},
    myFriend: []
  },
  mutations: {
    setProfile(state, payload) {
      state.profile = payload
    },
    setFriends(state, payload) {
      state.myFriend = payload
    }
  },
  actions: {
    getProfileById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/profile/${payload}`)
          .then(response => {
            context.commit('setProfile', response.data.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchProfileImage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://localhost:3000/profile/patchimg/${payload.id}`,
            payload.form
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`http://localhost:3000/profile/${payload.id}`, payload.form)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    addFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/roomchat/add', payload)
          .then(res => {
            resolve(res.data.msg)
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    },
    getAllFriends(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/roomchat/myfriend/${payload}`)
          .then(response => {
            context.commit('setFriends', response.data.data)
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getProfile(state) {
      return state.profile
    },
    myFriend(state) {
      return state.myFriend
    }
  }
}

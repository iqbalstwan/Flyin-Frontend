import axios from 'axios'

export default {
  state: {
    profile: {},
    myFriend: [],
    room: [],
    roomChat: [],
    allRoom: [],
    roomMsg: [],
    msg: {}
  },
  mutations: {
    setProfile(state, payload) {
      state.profile = payload
    },
    setFriends(state, payload) {
      state.myFriend = payload
    },
    setUserRoom(state, payload) {
      state.setUserRoom = payload
    },
    setRoomChat(state, payload) {
      state.roomChat = payload
    },
    setRoom(state, payload) {
      state.room = payload
    },
    setRoomMessage(state, payload) {
      state.roomMsg = payload
    },
    clearRoom(state) {
      state.allRoom = []
    },
    setAllRoom(state, payload) {
      state.allRoom = payload
    },
    setMsg(state, payload) {
      state.msg = payload
    },
    socketMsg(state, payload) {
      state.roomMsg.dataMsg.push(payload)
      console.log(state.roomMsg.dataMsg)
    }
  },
  actions: {
    getProfileById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/profile/${payload}`)
          .then(response => {
            context.commit('setProfile', response.data.data[0])
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
            `${process.env.VUE_APP_URL}/profile/patchimg/${payload.id}`,
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
    deleteImg(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `${process.env.VUE_APP_URL}/profile/deleteimg/${payload.id}`,
            payload.form
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
          })
      })
    },
    updateMap(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/profile/update-map/${payload.id}`,
            payload.data
          )
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error)

            reject(error.response)
          })
      })
    },
    patchProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/profile/${payload.id}`,
            payload.form
          )
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
          .post(`${process.env.VUE_APP_URL}/roomchat/add`, payload)
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
          .get(`${process.env.VUE_APP_URL}/roomchat/myfriend/${payload}`)
          .then(response => {
            context.commit('setFriends', response.data.data)
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    postRoom(context, payload) {
      return new Promise((resolve, reject) => [
        axios
          .post(`${process.env.VUE_APP_URL}/roomchat/room`, payload)
          .then(response => {
            console.log(response.data)
            context.commit('setRoom', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      ])
    },
    getRoomUserId(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_URL}/roomchat/roomuser?friend_id=${payload.friend_id}&user_id=${payload.user_id}`
          )
          .then(response => {
            console.log(response)
            context.commit('setRoomChat', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    getAllRoom(context, payload) {
      return new Promise((resolve, reject) => [
        axios
          .get(`${process.env.VUE_APP_URL}/roomchat/getroom/${payload}`)
          .then(response => {
            context.commit('setAllRoom', response.data.data)
            resolve(response)
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      ])
    },
    getRoomMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_URL}/roomchat/roomid?roomchat_id=${payload.roomId}&friend_id=${payload.friendId}`
          )
          .then(response => {
            console.log(response)
            resolve(response)
            context.commit('setRoomMessage', response.data.data)
          })
          .catch(error => {
            console.log(error)
            reject(error.response.data.msg)
          })
      })
    },
    postMessage(context, payload) {
      return new Promise((resolve, reject) => [
        axios
          .post(`${process.env.VUE_APP_URL}/roomchat/msg`, payload)
          .then(response => {
            console.log(response.data)
            context.commit('setMsg', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      ])
    }
  },
  getters: {
    getProfile(state) {
      return state.profile
    },
    myFriend(state) {
      return state.myFriend
    },
    room(state) {
      return state.room
    },
    roomChat(state) {
      return state.roomChat
    },
    allRoom(state) {
      return state.allRoom
    },
    roomMessage(state) {
      return state.roomMsg
    },
    messaging(state) {
      return state.msg
    }
  }
}

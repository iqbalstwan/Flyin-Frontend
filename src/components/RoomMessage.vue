<template>
  <b-container class="roomchat">
    <div class="header">
      <b-row class="room-header">
        <b-col cols="1" class="rooms-pict" align-self="center">
          <b-img :src="room.pict" />
        </b-col>
        <b-col cols="10" align-self="center">
          <p class="room-name" style="margin-top:20px">
            {{ room.name }}
          </p>
          <p class="room-status">{{ room.status }}</p>
        </b-col>
        <b-col cols="1" align-self="center">
          <b-img
            :src="require('../assets/icon/profileMenu.png')"
            style="cursor:pointer"
          />
        </b-col>
      </b-row>
    </div>
    <div id="chat">
      <b-container>
        <b-row v-for="(value, index) in messages" :key="index">
          <!-- <b-col v-if="value.class == 'sender'"> -->
          <b-col class="sender">
            <div class="float-left">
              <!-- <div :class="value.class" class="float-left"> -->
              <h6 style="margin-left:10px;margin-top:10px">
                <strong>{{ value.username }} : </strong> {{ value.message }}
              </h6>
            </div>
          </b-col>
          <!-- <b-col v-if="value.class == 'receiver'">
            <div :class="value.class" class="float-right">{{ value.msg }}</div>
          </b-col> -->
        </b-row>
      </b-container>
    </div>
    <b-container class="chatting">
      <b-row>
        <b-col cols="11">
          <b-form-input
            v-model="message"
            placeholder="Type your message..."
          ></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-button @click="sendMessage" style="background:#7e98df;border:none">
            <b-img :src="require('../assets/icon/send.png')" />
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      username: '',
      msg: '',
      messages: [],
      socket: io('http://localhost:3000'),
      room: {
        pict: require('../assets/profile/mom.png'),
        name: 'Iron Man',
        status: 'Online'
      }
    }
  },
  methods: {
    ...mapActions(['postMessage']),
    sendMessage() {
      const setData = {
        username: this.user.user_name,
        message: this.message
        // room: this.room
      }
      //global = semua orang dapat melihat ... global chatting
      this.socket.emit('globalMessage', setData)

      //private = hanya diri sendiri yg terlihat ... board ,welcome back
      // this.socket.emit('privateMessage', setData)

      //broadcast = orang lain bisa lihat kecuali kita ... notifikasi
      // this.socket.emit('broadcastMessage', setData)
      //   const setData = {
      //     username: this.username,
      //     message: this.message,
      //     room: this.room
      //   }
      //   this.socket.emit('roomMessage', setData)
      this.message = ''
      console.log(setData)
    },
    postMsg() {
      const setData = {
        user_id: this.user.user_id,
        friend_id: this.friends[0],
        roomchat_id: this.roomData,
        msg: this.msg
      }
      console.log(setData)
      //   this.postMessage(setData)
    }
  },
  mounted() {
    this.socket.on('chatMessage', data => {
      this.messages.push(data)
    })
  },
  computed: {
    ...mapGetters({
      profile: 'getProfile',
      user: 'getUser',
      friends: 'myFriend',
      roomy: 'roomChat',
      roomData: 'room'
    })
  }
}
</script>

<style scoped>
.roomchat {
  /* width: 1016px;
  height: 1024px;
  left: 350px;
  top: 0px; */
  height: 800px;
  background: #fafafa;
}
.roomchat .chatting {
  margin-top: 30px;
}
.p-container {
  overflow-x: hidden;
}

.person {
  cursor: pointer;
}

.roomchat .room-header {
  background: white;
}

.roomchat #chat {
  height: 550px;
  overflow: auto;
}

.roomchat #chat .sender {
  text-align: left;
  width: 400px;
  height: 50px;
  margin: 30px;
  background: #7e98df;
  color: white;
  border-radius: 35px 35px 35px 10px;
}

.roomchat #chat .receiver {
  width: 200px;
  height: 50px;
  background: #ffffff;
  border-radius: 35px 10px 35px 35px;
}
</style>

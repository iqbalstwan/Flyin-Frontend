<template>
  <b-container class="roomchat">
    <div class="header">
      <b-row class="room-header">
        <b-col cols="1" class="roomy" align-self="center">
          <b-img
            :src="url + '/' + roomMsg.profile_img"
            style="width:80px;height:80px;border-radius: 20px"
          />
        </b-col>
        <b-col cols="9" md="10" align-self="center">
          <p class="room-name" style="margin-top:20px">{{ roomMsg.user_name}}</p>
          <p class="room-status">{{ room.status }}</p>
        </b-col>
        <b-col cols="1" align-self="center">
          <b-img
            :src="require('../assets/icon/profileMenu.png')"
            v-b-toggle.sidebar-right
            style="cursor:pointer"
          />
          <b-sidebar id="sidebar-right" title="Profile" right shadow>
            <div>
              <b-img
                :src="url + '/' + roomMsg.profile_img"
                style="width: 150px;
                height: 150px;margin-bottom:10px; border-radius: 30px;"
              ></b-img>
              <h5 style="text-align:right;margin-right:20px">Username</h5>
              <h6 style="text-align:right;margin-right:20px;color:grey">{{ roomMsg.user_name }}</h6>
              <h5 style="text-align:right;margin-right:20px">Email</h5>
              <h6 style="text-align:right;margin-right:20px;color:grey">{{ roomMsg.user_email }}</h6>
              <h5 style="text-align:right;margin-right:20px">Phone</h5>
              <h6 style="text-align:right;margin-right:20px;color:grey">{{ roomMsg.user_phone }}</h6>
              <h5 style="text-align:right;margin-right:20px">Bio</h5>
              <h6 style="text-align:right;margin-right:20px;color:grey">{{ roomMsg.profile_desc }}</h6>
              <GmapMap
                :center="coordinate"
                :zoom="20"
                map-type-id="terrain"
                style="width: 320px; height: 300px"
              >
                <GmapMarker
                  :position="coordinate"
                  :clickable="true"
                  :draggable="true"
                  @click="clickMarker"
                  icon="https://img.icons8.com/color/48/000000/map-pin.png"
                />
              </GmapMap>
            </div>
          </b-sidebar>
        </b-col>
      </b-row>
    </div>
    <div id="chat">
      <b-container>
        <b-row v-for="(value, index) in roomMsg.dataMsg" :key="index">
          <b-col v-if="user.user_id === value.user_id">
            <b-row class="float-right">
              <div class="sender">
                <h6 style="margin-right:20px;margin-top:10px">{{ value.msg }}</h6>
              </div>
            </b-row>
          </b-col>
          <b-col v-else>
            <b-row class="float-left">
              <div class="receiver" style="margin-left:10px;margin-top:15px">
                <h6 style="margin-left:20px;margin-top:10px">{{ value.msg }}</h6>
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container class="chatting">
      <b-row>
        <b-col cols="9" md="11">
          <b-form-input class="type" v-model="message" placeholder="Type your message..."></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-button @click="sendMsg" style="background:#7e98df;border:none;">
            <b-img :src="require('../assets/icon/send.png')" />
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import io from 'socket.io-client'
// import Empty from '../components/EmptyChat'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Chat',
  data() {
    return {
      coordinate: {
        lat: 0,
        lng: 0
      },
      friendId: '',
      url: process.env.VUE_APP_URL,
      message: '',
      username: '',
      form: {
        user_name: '',
        user_password: '',
        user_phone: '',
        profile_img: {}
      },
      text: '',
      messages: [],
      socket: io(process.env.VUE_APP_URL),
      room: {
        pict: require('../assets/profile/mom.png'),
        name: 'Iron Man',
        status: 'Online'
      }
    }
  },
  components: {
    // Empty
  },
  created() {
    this.getUserById(this.user.user_id)
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        const payload = {
          id: this.user.user_id,
          data: {
            lat: this.coordinate.lat,
            lng: this.coordinate.lng,
            user_updated_at: new Date()
          }
        }
        this.updateMap(payload)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    ...mapActions(['postMessage', 'updateMap', 'getUserById']),
    ...mapMutations(['socketMsg']),
    sendMsg() {
      const setData = {
        class: 'sender',
        user_id: this.user.user_id,
        friend_id: this.roomMsg.user_id,
        roomchat_id: this.roomMsg.roomchat_id,
        msg: this.message
      }
      this.postMessage(setData)
      this.socket.emit('roomyMsg', setData)
      this.message = ''
    },
    clickMarker(position) {
      console.log('clicked')
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getProfile',
      user: 'getUser',
      friends: 'myFriend',
      roomy: 'roomChat',
      roomData: 'room',
      messaging: 'messaging',
      roomMsg: 'roomMessage',
      isSelected: 'getIsSelected'
    })
  }
}
</script>

<style scoped>
.roomchat {
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
  text-align: right;
  width: 200px;
  height: 3.5em;
  margin: 20px;
  background: #7e98df;
  color: white;
  border-radius: 35px 10px 35px 35px;
}

.roomchat #chat .receiver {
  text-align: left;
  width: 200px;
  height: 3.5em;
  background: rgb(187, 107, 121);
  color: white;
  border-radius: 35px 35px 35px 10px;
}

/* //responsive */
@media screen and (max-width: 320px) {
  .roomchat .header .room-header .roomy img {
    width: 50px !important;
    height: 50px !important;
  }
}
</style>

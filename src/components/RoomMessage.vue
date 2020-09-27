<template>
  <b-container class="roomchat">
    <div class="header">
      <b-row class="room-header">
        <b-col cols="1" class="rooms-pict" align-self="center">
          <b-img :src="room.pict" />
        </b-col>
        <b-col cols="10" align-self="center">
          <p class="room-name" style="margin-top:20px">{{ room.name }}</p>
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
        <b-row v-for="(value, index) in chat" :key="index">
          <b-col v-if="value.class == 'sender'">
            <div :class="value.class" class="float-left">
              <h6 style="margin-left:10px;margin-top:10px">
                {{ value.msg }}
              </h6>
            </div>
          </b-col>
          <b-col v-if="value.class == 'receiver'">
            <div :class="value.class" class="float-right">{{ value.msg }}</div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container class="chatting">
      <b-row>
        <b-col cols="11">
          <b-form-input placeholder="Type your message..."></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-button style="background:#7e98df;border:none">
            <b-img :src="require('../assets/icon/send.png')" />
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      room: {
        pict: require('../assets/profile/mom.png'),
        name: 'Mang Oleh',
        status: 'Online'
      },
      chat: [
        {
          msg: 'Odading mang oleh rasanyaa anjay bgt',
          class: 'sender'
        },
        {
          msg: 'mantap kawann',
          class: 'receiver'
        },
        {
          msg: 'Ok😉',
          class: 'sender'
        },
        {
          msg: 'seperti anda menjadi ironman',
          class: 'sender'
        },
        {
          msg: 'masasihh',
          class: 'receiver'
        },
        {
          msg: 'Thankyou',
          class: 'sender'
        }
      ]
    }
  },
  methods: {
    scrollToEnd() {
      const container = this.$el.querySelector('#chat')
      container.scrollTop = container.scrollHeight
    }
  },
  mounted() {
    this.scrollToEnd()
  }
}
</script>

<style scoped>
.roomchat {
  /* width: 1016px;
  height: 1024px;
  left: 350px;
  top: 0px; */
  height: 900px;
  background: #fafafa;
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

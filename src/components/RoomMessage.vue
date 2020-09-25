<template>
  <b-container-fluid class="room">
    <b-card border-variant="white">
      <b-card-header header-bg-variant="white">
        <b-row>
          <b-col md="1">
            <b-img
              v-bind="mainProps"
              :src="require('../assets/Menu.png')"
              rounded="circle"
              alt="Circle image"
              >></b-img
            >
          </b-col>
          <b-col md="11" align-self="center">
            <p>{{ selectedRoom }}</p>
          </b-col>
        </b-row>
      </b-card-header>
      <b-card-body style="background:#FAFAFA">
        <b-row class="bubble-chat">
          <b-col
            md="12"
            class="text-left purp"
            v-for="(value, index) in messages"
            :key="index"
          >
            <p>
              {{ value.user_id }}: {{ value.msg }} ({{
                value.msg_created_at
                  .split('T')
                  .join(', ')
                  .slice(0, 17)
              }})
            </p>
          </b-col>
          <b-col md="12" class="text-right or">
            <p>chat goes here</p>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer footer-bg-variant="white" footer-border-variant="white">
        <b-row>
          <b-col md="11">
            <b-form-input
              style="background:#FAFAFA;border:none"
              v-model="textToSend"
              placeholder="Type a message"
            ></b-form-input>
          </b-col>
          <b-col md="1" class="send text-center" @click="send()">
            <b-img :src="require('../assets/Menu.png')" />
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>
  </b-container-fluid>
</template>

<style scoped>
.room {
  /* width: 1016px; */
  height: 1024px;
  /* left: 350px; */
  top: 0px;

  background: #fafafa;
}
.p-container {
  overflow-x: hidden;
}

.person {
  cursor: pointer;
}

.content .room-chat .bubble-chat .purp {
  background: rgba(94, 80, 161, 0.8);
  padding: 1em;
  border-radius: 30px 30px 30px 30px;
  margin: 0.3em;
}

.content .room-chat .bubble-chat .purp p {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: white;
  margin: 0;
}
</style>

<template>
  <b-container class="profile">
    <b-row style="display:flex;justify-content:space-between">
      <div>
        <h1
          style="color:#7e98df;margin-left:20px;margin-top:15px;box-shadow:none;border:none"
          v-b-toggle.side-profile
        >
          <b-sidebar id="side-profile" title="Profile" shadow>
            <div class="img-profile">
              <b-img
                :src="url + '/' + user.profile_img"
                style="width: 150px;
                height: 150px;margin-bottom:10px; border-radius: 30px;"
              ></b-img>
              <input type="file" ref="file" @change="updateImg" style="display: none" />
              <h6 @click="$refs.file.click()" style="cursor: pointer;margin-bottom:20px">
                Edit
                <b-icon icon="pencil-fill"></b-icon>
              </h6>
              <h6 @click.prevent="delImg()" style="cursor: pointer; margin-top: 2px">
                delete
                <b-icon icon="trash"></b-icon>
              </h6>
              <h5 style="text-align:left;margin-left:20px">Username</h5>
              <h6 style="text-align:left;margin-left:20px;color:grey">{{ user.user_name }}</h6>
              <h5 style="text-align:left;margin-left:20px">Email</h5>
              <h6 style="text-align:left;margin-left:20px;color:grey">{{ user.user_email }}</h6>
              <h5 style="text-align:left;margin-left:20px">Phone</h5>
              <h6 style="text-align:left;margin-left:20px;color:grey">{{ user.user_phone }}</h6>
              <h5 style="text-align:left;margin-left:20px">Bio</h5>
              <h6 style="text-align:left;margin-left:20px;color:grey">{{ user.profile_desc }}</h6>
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
              <b-button
                v-b-modal.modal-1
                v-on:click="setUpdate()"
                style="background:#7e98df;border:white"
              >Edit Profile</b-button>
              <b-modal id="modal-1" title="Update" :hide-footer="true">
                <b-form>
                  <b-form-group id="input-group-1" label=" Username:" label-for="input-1">
                    <b-form-input
                      id="input-1"
                      type="text"
                      v-model="form.user_name"
                      required
                      placeholder="Input User Name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-1" label="Phone:" label-for="input-1">
                    <b-form-input
                      id="input-1"
                      type="text"
                      v-model="form.user_phone"
                      required
                      placeholder="Input Your phone"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-1" label="Bio:" label-for="input-1">
                    <b-form-input
                      id="input-1"
                      type="text"
                      v-model="form.profile_desc"
                      required
                      placeholder="Bio"
                    ></b-form-input>
                  </b-form-group>
                  <b-button @click="Update" style="background:#7e98df;border:white">Update</b-button>
                </b-form>
              </b-modal>
              <h5
                @click.prevent="handleLogout"
                style="cursor:pointer;color:#7e98df;margin-top:10px"
              >Logout</h5>
            </div>
          </b-sidebar>Flyin
        </h1>
      </div>
      <div>
        <b-img
          thumbnail
          fluid
          :src="require('@/assets/Menu.png')"
          alt="Image 1"
          style="cursor:pointer;box-shadow:none;border:none;margin-right:25px"
          id="set-popover"
        ></b-img>
        <b-popover placement="bottomleft" target="set-popover" triggers="click" variant="primary">
          <h5 style="color:white;cursor:pointer" v-b-toggle.side-profile>
            <img src="../assets/icon/Settings.png" alt /> Setting
          </h5>
          <h5 style="color:white;cursor:pointer;" v-b-modal.modal-2>
            <b-modal id="modal-2" title="Invite Friend" :hide-footer="true">
              <b-form>
                <b-form-group id="input-group-1" label=" Friend Email:" label-for="input-1">
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="friendEmail"
                    required
                    placeholder="Input email"
                  ></b-form-input>
                </b-form-group>

                <b-button
                  @click="addFriends"
                  style="background:#7e98df;border:white;cursor:pointer"
                >Invite</b-button>
              </b-form>
            </b-modal>
            <img src="../assets/icon/Invite.png" alt /> Invite
          </h5>
          <h5 @click="Friend" style="color:white;cursor:pointer;" v-b-modal.modal-3>
            <b-modal id="modal-3" size="md" title="List Friend" :hide-footer="true">
              <b-row
                style="display:flex;justify-content:space-around;margin:40px"
                class="list-friend"
                v-for="(value, index) in friends"
                :key="index"
              >
                <div>
                  <b-img
                    :src="url + '/' + value.profile_img"
                    style="width:64px;border-radius: 20px;"
                  ></b-img>
                </div>
                <div>
                  <h6>{{ value.user_name }}</h6>
                  <h6 style="color:grey;">{{ value.user_phone }}</h6>
                  <h6 style="color:grey;">{{ value.profile_desc }}</h6>
                </div>
                <b-button
                  @click="createRoom(value.friend_id)"
                  class="btn btn-primary button"
                  style="background:#7e98df;border:none;height:40px"
                >Chat</b-button>
              </b-row>
            </b-modal>
            <img src="../assets/icon/Contacts.png" alt />Contact
          </h5>
        </b-popover>
      </div>
    </b-row>
    <b-row class="searching" style="margin-top:30px">
      <div>
        <b-form-input class="search" placeholder="Type a message"></b-form-input>
      </div>
      <div>
        <img src="../assets/icon/Plus.png" alt style="margin-top:28px;margin-right:28px" />
      </div>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <div>
          <b-button
            @click="getRoom"
            class="btn btn-primary button"
            style="background:#7e98df;border:none;"
          >All</b-button>
          <b-button
            @click="clearRoom"
            class="btn btn-primary button"
            style="background:#7e98df;border:none;margin-left:10px"
          >Unread</b-button>
        </div>
      </b-col>
    </b-row>
    <div class="profile-chat">
      <b-row
        class="chat-list"
        v-for="(value, index) in allRoom"
        :key="index"
        @click="getRoomChat(value)"
      >
        <b-col cols="3">
          <b-img
            :src="url + '/' + value.profile_img"
            class="img-room"
            style="width:64px;height:60px;border-radius: 20px;cursor:pointer"
          ></b-img>
        </b-col>
        <b-col cols="6">
          <p class="chat-room">
            <strong>{{ value.user_name }}</strong>
          </p>
          <p :class="value.class" v-if="value.isSender">{{ value.msg }}</p>
          <p :class="value.class" v-else style="color:grey">online</p>
        </b-col>
        <b-col cols="3" class="time-room">
          <p>17.59</p>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<style scoped>
.profile {
  /* width: 350px; */
  height: 800px;
  top: 0px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.profile img {
  margin-top: 25px;
}
.profile h1 {
  margin-top: 10px;
}
.profile .searching .search {
  width: 250px;
  height: 40px;
  left: 30px;
  top: 556px;
  margin-left: 20px;
  margin-top: 20px;

  background: #fafafa;
  border-radius: 15px;
}

.profile .searching {
  display: flex;
  justify-content: space-between;
}

.profile .b-popover .h1 {
  color: red;
}

.profile .profile-chat .chat-room {
  margin-top: 20px;
}
.profile .profile-chat .time-room {
  margin-top: 20px;
}

.profile .profile-chat {
  height: 550px;
  overflow: auto;
}

/* //responsive */
@media screen and (max-width: 767px) {
  .profile .searching .search {
    width: 12em;
  }
}

@media (min-width: 600px) and (max-width: 1200px) {
  .profile .searching .search {
    width: 9em;
  }
}
</style>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import io from 'socket.io-client'

// import SideProfile from '../components/SideProfile'
export default {
  name: 'LeftProfile',
  components: {
    // SideProfile
  },
  data() {
    return {
      socket: io(process.env.VUE_APP_URL),
      coordinate: {
        lat: 0,
        lng: 0
      },
      url: process.env.VUE_APP_URL,
      formImage: {},
      form: {
        user_id: '',
        user_name: '',
        user_phone: '',
        profile_desc: '',
        profile_img: {}
      },
      roomId: '',
      oldRoom: '',
      friendEmail: '',
      friendId: ''
      //   allRooms: '',
    }
  },
  mounted() {
    this.getAllFriends(this.user.user_id)
    this.socket.on('chatFlyin', data => {
      this.socketMsg(data)
    })
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
    ...mapActions([
      'logout',
      'patchProfileImage',
      'deleteImg',
      'getProfileById',
      'getAllFriends',
      'getUserById',
      'patchProfile',
      'addFriend',
      'postRoom',
      'getUserRoom',
      'getRoomUserId',
      'getRoomMessage',
      'getAllRoom',
      'updateMap'
    ]),
    ...mapMutations(['clearRoom', 'socketMsg']),
    updateImg(event) {
      this.formImage.profile_img = event.target.files[0]
      const data = new FormData()
      data.append('profile_img', this.formImage.profile_img)
      const payload = {
        id: this.user.user_id,
        form: data
      }
      console.log(payload)
      this.patchProfileImage(payload)
        .then(result => {
          console.log(result)
          this.$bvToast.toast(`${result.msg}`, {
            title: 'Success ',
            variant: 'info',
            solid: true
          })
          this.formImage = {}
          this.getUserById(this.user.user_id)
        })
        .catch(error => {
          console.log(error)
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Check it again ',
            variant: 'danger',
            solid: true
          })
        })
    },
    delImg() {
      const setData = {
        id: this.user.user_id
      }
      console.log(setData)
      this.deleteImg(setData)
        .then(response => {
          console.log(response)
          this.$bvToast.toast(`${response.msg}`, {
            title: 'Info ',
            variant: 'success',
            solid: true
          })
          this.getUserById(this.user.user_id)
        })
        .catch(error => {
          this.$bvToast.toast(`${error}`, {
            title: 'Check it again ',
            variant: 'danger',
            solid: true
          })
        })
    },
    setUpdate() {
      this.form = {
        user_id: this.user.user_id,
        user_name: this.user.user_name,
        user_phone: this.user.user_phone,
        profile_desc: this.user.profile_desc
      }
    },
    Update() {
      const payload = {
        id: this.user.user_id,
        form: this.form
      }
      this.patchProfile(payload)
        .then(result => {
          this.getUserById(this.user.user_id)
          this.$bvToast.toast(`${result.msg}`, {
            title: 'Success ',
            variant: 'info',
            solid: true
          })
        })
        .catch(error => {
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Check it again ',
            variant: 'danger',
            solid: true
          })
        })
    },
    addFriends() {
      const setData = {
        user_id: this.user.user_id,
        friend_email: this.friendEmail
      }
      this.addFriend(setData)
        .then(result => {
          this.$bvToast.toast(`${result}`, {
            title: 'Success ',
            variant: 'success',
            solid: true
          })
        })
        .catch(error => {
          this.$bvToast.toast(`${error}`, {
            title: 'Check it again ',
            variant: 'danger',
            solid: true
          })
        })
    },
    Friend() {
      this.getAllFriends(this.user.user_id)
    },
    handleLogout() {
      this.$bvModal
        .msgBoxConfirm('Are you sure?', {
          cancelVariant: 'light',
          okVariant: 'primary',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        .then(item => {
          this.isLogout = item
          this.isLogout ? this.logout() : console.log(item)
        })
    },
    clickMarker(position) {
      console.log('clicked')
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
    },
    createRoom(data) {
      const setData = {
        user_id: this.user.user_id,
        friend_id: data
      }
      console.log(setData)
      this.postRoom(setData)
        .then(result => {
          this.$bvToast.toast(`${result.data.msg}`, {
            title: 'Info ',
            variant: 'info',
            solid: true
          })
        })
        .catch(error => {
          this.$bvToast.toast(`${error}`, {
            title: 'Check it again ',
            variant: 'danger',
            solid: true
          })
        })
    },
    getRoom() {
      this.getAllRoom(this.user.user_id)
    },
    getRoomChat(value) {
      if (this.oldRoom) {
        console.log('room lama')
        this.socket.emit('changeRoom', {
          oldRoom: this.oldRoom,
          newRoom: value.roomchat_id
        })
        this.oldRoom = value.roomchat_id
      } else {
        console.log('room baru')
        this.socket.emit('setRoom', { newRoom: value.roomchat_id })
        this.oldRoom = value.roomchat_id
      }

      const payload = {
        roomId: value.roomchat_id,
        friendId: value.friend_id
      }
      this.getRoomMessage(payload)
      const setData = {
        friend_id: this.friendId,
        user_id: this.user.user_id,
        profile_img: this.profileImg
      }
      this.getRoomUserId(setData)
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getProfile',
      user: 'getUser',
      friends: 'myFriend',
      roomy: 'roomChat',
      roomData: 'room',
      roomMsg: 'roomMsg',
      allRoom: 'allRoom'
    })
  }
}
</script>

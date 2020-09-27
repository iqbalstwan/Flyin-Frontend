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
                :src="url + user.profile_img"
                style="width: 150px;
        height: 150px;margin-bottom:10px; border-radius: 30px;"
              ></b-img>
              <input
                type="file"
                ref="file"
                @change="updateImg"
                style="display: none"
              />
              <h6
                @click="$refs.file.click()"
                style="cursor: pointer;margin-bottom:20px"
              >
                Edit
                <b-icon icon="pencil-fill"></b-icon>
              </h6>
              <h5 style="text-align:left;margin-left:20px">Username</h5>
              <h6 style="text-align:left;margin-left:20px;color:grey">
                {{ user.user_name }}
              </h6>
              <h5 style="text-align:left;margin-left:20px">Email</h5>
              <h6 style="text-align:left;margin-left:20px;color:grey">
                {{ user.user_email }}
              </h6>
              <h5 style="text-align:left;margin-left:20px">Phone</h5>
              <h6 style="text-align:left;margin-left:20px;color:grey">
                {{ user.user_phone }}
              </h6>
              <h5 style="text-align:left;margin-left:20px">Bio</h5>
              <h6 style="text-align:left;margin-left:20px;color:grey">
                {{ user.profile_desc }}
              </h6>
              <GmapMap
                :center="coordinate"
                :zoom="12"
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
                >Edit Profile</b-button
              >
              <b-modal id="modal-1" title="Update" :hide-footer="true">
                <b-form>
                  <b-form-group
                    id="input-group-1"
                    label=" Username:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="text"
                      v-model="form.user_name"
                      required
                      placeholder="Input User Name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-1"
                    label="Phone:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="text"
                      v-model="form.user_phone"
                      required
                      placeholder="Input Your phone"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-1"
                    label="Bio:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="text"
                      v-model="form.profile_desc"
                      required
                      placeholder="Bio"
                    ></b-form-input>
                  </b-form-group>
                  <b-button @click="Update">Update</b-button>
                </b-form>
              </b-modal>
              <h5
                @click.prevent="handleLogout"
                style="cursor:pointer;color:#7e98df;margin-top:10px"
              >
                Logout
              </h5>
            </div>
          </b-sidebar>
          Flyin
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
        <b-popover
          placement="bottomleft"
          target="set-popover"
          triggers="click"
          variant="primary"
        >
          <h5 style="color:white;cursor:pointer">
            <img src="../assets/icon/Settings.png" alt="" /> Setting
          </h5>
          <h5 style="color:white;cursor:pointer;" v-b-modal.modal-2>
            <b-modal id="modal-2" title="Invite Friend" :hide-footer="true">
              <b-form>
                <b-form-group
                  id="input-group-1"
                  label=" Friend Email:"
                  label-for="input-1"
                >
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
                  style="background:#7e98df;border:white"
                  >Invite</b-button
                >
              </b-form>
            </b-modal>
            <img src="../assets/icon/Invite.png" alt="" /> Invite
          </h5>
          <h5
            @click="Friend"
            style="color:white;cursor:pointer;"
            v-b-modal.modal-3
          >
            <b-modal id="modal-3" title="List Friend" :hide-footer="true">
              <b-row
                style="display:flex;justify-content:space-around;margin:40px"
                class="list-friend"
                v-for="(value, index) in friends"
                :key="index"
              >
                <div>
                  <b-img
                    :src="url + value.profile_img"
                    style="width:64px;border-radius: 20px;"
                  ></b-img>
                </div>
                <div>
                  <h6>{{ value.user_name }}</h6>
                  <h6 style="color:grey;">{{ value.user_phone }}</h6>
                  <h6 style="color:grey;">{{ value.profile_desc }}</h6>
                </div>
                <b-button
                  class="btn btn-primary button"
                  style="background:#7e98df;border:none;height:40px"
                  >Go</b-button
                >
              </b-row>
            </b-modal>
            <img src="../assets/icon/Contacts.png" alt="" />Contact
          </h5>
        </b-popover>
      </div>
    </b-row>
    <b-row class="searching" style="margin-top:30px">
      <div>
        <b-form-input
          class="search"
          placeholder="Type a message"
        ></b-form-input>
      </div>
      <div>
        <img
          src="../assets/icon/Plus.png"
          alt=""
          style="margin-top:28px;margin-right:28px"
        />
      </div>
    </b-row>
    <b-row class="mt-4">
      <b-col
        ><div>
          <b-button
            class="btn btn-primary button"
            style="background:#7e98df;border:none"
            >All</b-button
          ><b-button
            class="btn btn-primary button"
            style="margin-right:20px;margin-left:20px;background:#7e98df;border:none"
            >Important</b-button
          ><b-button
            class="btn btn-primary button"
            style="background:#7e98df;border:none"
            >Unread</b-button
          >
        </div></b-col
      >
    </b-row>
    <div class="profile-chat">
      <b-row class="chat-list" v-for="(value, index) in friends" :key="index">
        <b-col cols="3">
          <b-img
            :src="url + value.profile_img"
            class="img-room"
            style="width:64px;border-radius: 20px;"
          ></b-img>
        </b-col>
        <b-col cols="6">
          <p class="chat-room">{{ value.user_name }}</p>
          <p :class="value.class" v-if="value.isSender">Me: {{ value.msg }}</p>
          <p :class="value.class" v-else>{{ value.msg }}</p>
        </b-col>
        <b-col cols="3" class="time-room">
          <p>{{ value.time }}</p>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<style scoped>
.profile {
  /* width: 350px; */
  height: 900px;
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
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

// import SideProfile from '../components/SideProfile'
export default {
  name: 'LeftProfile',
  components: {
    // SideProfile
  },
  data() {
    return {
      coordinate: {
        lat: 0,
        lng: 0
      },
      url: 'http://localhost:3000/',
      formImage: {},
      form: {
        user_id: '',
        user_name: '',
        user_phone: '',
        profile_desc: ''
      },
      friendEmail: '',
      rooms: [
        {
          img: require('../assets/profile/mom.png'),
          name: 'Theresa Webb',
          msg: 'mantapp brotherr',
          class: 'unread',
          time: '15:20'
        },
        {
          img: require('../assets/profile/mom.png'),
          name: 'Calvin Flores',
          msg: 'Yomann',
          class: 'unread',
          time: '15:13'
        },
        {
          img: require('../assets/profile/mom.png'),
          name: 'Gregory Bell',
          msg: 'Skuyyy',
          class: 'unread',
          time: '15:13'
        }
      ]
    }
  },
  mounted() {
    this.getAllFriends(this.user.user_id)
  },
  created() {
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        // console.log(this.coordinate)
      })
      .catch(error => {
        alert(error)
      })
  },
  methods: {
    ...mapActions([
      'logout',
      'patchProfileImage',
      'getProfileById',
      'getAllFriends',
      'getUserById',
      'patchProfile',
      'addFriend'
    ]),
    updateImg(event) {
      this.formImage.profile_img = event.target.files[0]
      const data = new FormData()
      data.append('profile_img', this.formImage.profile_img)
      const payload = {
        id: this.user.user_id,
        form: data
      }
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
          this.$bvToast.toast(`${error.data.msg}`, {
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
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getProfile',
      user: 'getUser',
      friends: 'myFriend'
    })
  }
}
</script>

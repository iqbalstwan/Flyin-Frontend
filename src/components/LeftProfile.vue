<template>
  <b-container class="profile">
    <b-row style="display:flex;justify-content:space-around">
      <div>
        <h1 style="color:#7e98df">
          Telegram
        </h1>
      </div>
      <div>
        <b-img
          thumbnail
          fluid
          :src="require('@/assets/Menu.png')"
          alt="Image 1"
          style="cursor:pointer"
          id="set-popover"
        ></b-img>
        <b-popover placement="bottomleft" target="set-popover" triggers="click"
          ><h1>Setting</h1>
          <h1>contact</h1>
          <h1>addContact</h1>
        </b-popover>
      </div>
    </b-row>
    <!-- <b-row class="profile-image">
      <b-col>
        <img
          src="../assets/naruto.jpg"
          alt=""
          style="width: 150px;
        height: 150px; object-fit: cover"
        />
      </b-col>
    </b-row> -->
    <b-row class="searching" style="margin-top:30px">
      <div>
        <b-form-input
          class="search"
          v-model="search"
          placeholder="Type a message"
        ></b-form-input>
      </div>
      <div>
        <img
          src="../assets/icon/Plus.png"
          alt=""
          style="margin-top:35px;margin-right:28px"
        />
      </div>
    </b-row>
  </b-container>
</template>

<style scoped>
.profile {
  /* width: 350px; */
  height: 1024px;
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
  height: 60px;
  left: 30px;
  top: 556px;
  margin-left: 20px;
  margin-top: 20px;

  background: #fafafa;
  border-radius: 15px;
}

.profile .searching {
  display: flex;
  justify-content: space-around;
}

.profile .popover .h1 {
  color: red;
}
</style>

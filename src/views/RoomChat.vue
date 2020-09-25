<template>
  <div class="roomchat-container">
    <b-row>
      <b-col md="4" sm="4" class="content">
        <LeftProfile />
      </b-col>
      <b-col md="8" sm="8" class="content">
        <RoomMessage />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LeftProfile from '../components/LeftProfile'
import RoomMessage from '../components/RoomMessage'
export default {
  name: 'Roomchat',
  components: {
    LeftProfile,
    RoomMessage
  }
}
</script>

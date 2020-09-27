<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4" class="content">
        <LeftProfile />
      </b-col>
      <b-col cols="8" class="content">
        <RoomMessage />
      </b-col>
    </b-row>
  </b-container>
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

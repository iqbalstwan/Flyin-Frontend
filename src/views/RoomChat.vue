<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" md="4" class="content">
        <LeftProfile />
      </b-col>
      <b-col v-if="!isSelected" cols="12" md="8" class="content">
        <Empty />
      </b-col>
      <b-col v-else cols="12" md="8" class="content">
        <RoomMessage />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LeftProfile from '../components/LeftProfile'
import Empty from '../components/EmptyChat'
import RoomMessage from '../components/RoomMessage'
import { mapGetters } from 'vuex'
export default {
  name: 'Roomchat',
  components: {
    LeftProfile,
    Empty,
    RoomMessage
  },
  computed: {
    ...mapGetters({
      isSelected: 'getSelect'
    })
  }
}
</script>

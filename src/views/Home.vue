<template>
  <div class="home">
    <h1>Maps</h1>
    <GmapMap
      :center="coordinate"
      :zoom="10"
      map-type-id="terrain"
      style="width: 200px; height: 300px"
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
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      }
    }
  },
  created() {
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        console.log(coordinates)
      })
      .catch(error => {
        alert(error)
      })
  },
  methods: {
    clickMarker(position) {
      console.log('clicked')
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
    }
  }
}
</script>

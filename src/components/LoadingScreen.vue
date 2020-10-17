<template>
  <div :class="{ loader: true, fadeout: !isLoading }">
    <img class="image" src="../assets/icon/splash.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
  props: ['isLoading']
  //   data: () => ({
  //     isLoading: true
  //   }),
  //   mounted() {
  //     setTimeout(function() {
  //       this.$router.push({ path: '/login' })
  //     }, 5000)
  //   }
}
</script>

<style>
.loader {
  background-color: #63ab97;
  bottom: 0;
  color: white;
  display: block;
  font-size: 32px;
  left: 0;
  overflow: hidden;
  padding-top: 10vh;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
}

.image {
  margin-top: 200px;
}

.fadeout {
  animation: fadeout 4s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes image {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>

<template>
  <div class="h-full w-full relative">
    <video class="w-screen" autoplay muted loop>
      <source src=video.webm type=video/webm> <source src=penny.mp4
      type=video/mp4>
    </video>
    <div class="arrow-right relative top-0"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      message: '',
      hasLiveStream: false,
      hasFeatVideo: false,
      liveId: null,
      videoId: null,
    }
  },

  methods: {
    logout() {
      this.$strapi.logout()
    },
  },
}
</script>

<style scoped>
.arrow-right {
  width: 0;
  height: 0;
  position: absolute;
  top: 35%;
  left: 45%;
  border-top: 130px solid transparent;
  border-bottom: 130px solid transparent;
  border-left: 250px solid #c11a08a1;
}
</style>

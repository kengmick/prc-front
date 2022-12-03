<template>
  <div>
    <h2>Coming soon</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [],
      error: '',
    }
  },
  async mounted() {
    try {
      const videos = await this.$strapi.find('videos')
      this.videos = videos
    } catch (error) {
      this.error = error
    }
  },
}
</script>

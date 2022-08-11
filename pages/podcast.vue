<template>
  <div>
    <Title title="Podcast" />
    <section
      v-if="items"
      class="flex flex-row flex-wrap items-center justify-center gap-14 mb-12"
    >
      <div v-for="video in items.items" :key="video.snippet.resourceId.videoId">
        <div class="video-container">
          <div class="h-48 w-screen"></div>
          <iframe
            width="1280"
            height="720"
            :src="`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?list=PL77Cbf0PuapXtyAl3jo0C2TQVkc2UeT_7`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>
<script src="https://apis.google.com/js/api.js"></script>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  async fetch() {
    this.items = await this.$http.$get(
      'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PL77Cbf0PuapXtyAl3jo0C2TQVkc2UeT_7&key=AIzaSyAWavt-2FzH79KfI0zaqMYltq-pVAusE1Q'
    )
    console.log(this.items)
  },
}
</script>

<style scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  max-width: 500px;
  overflow: hidden;
}
.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

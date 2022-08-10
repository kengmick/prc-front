<template>
  <div>
    <Title title="Podcast" />
    <section
      v-if="items"
      class="container mx-auto flex flex-col items-center gap-14 mb-12"
    >
      <!-- <section v-for="video in items.items" :key="video">
        <pre>{{ video.snippet.resourceId }}</pre>
      </section> -->
      <iframe
        v-for="video in items.items"
        :key="video.snippet.resourceId.videoId"
        width="1280"
        height="720"
        :src="`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?list=PL77Cbf0PuapXtyAl3jo0C2TQVkc2UeT_7`"
        title="PRC Podcast #5- K.B. Elliott July 29, 2022"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
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
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <section>
    <h1 class="main_page_padding_left_right text-2xl text-center pt-6">
      24/7 Video Stream id:
    </h1>
    <div class="flex justify-center mb-10">
      <div v-if="videoFile">
        <video width="320" height="240" controls>
          <source :src="videoFile" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      videoFile: null,
    }
  },
  async mounted() {
    const video = await this.$strapi.find('singleVideo', {
      id: this.$route.query.liveId,
    })
    this.videoFile = video.video.url
  },
}
</script>

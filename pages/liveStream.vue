<template>
  <section>
    <div class="flex justify-center mb-10">
      <div v-if="videoFile">
        <video controls>
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
    try {
      const video = await this.$strapi.find('vid')
      this.videoFile = video.url
      console.log(video.url)
    } catch (error) {
      console.log(error) // eslint-disable-line no-console
    }
  },
}
</script>

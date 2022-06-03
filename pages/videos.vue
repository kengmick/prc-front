<template>
  <div>
    <h1 class="text-5xl chedder main_red_text text-center">
      This is the video page
    </h1>
    <section
      v-if="videos"
      class="mx-6 my-10 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10"
    >
      <VideoCard
        v-for="(video, index) in videos"
        :key="video.title + index"
        :video="video"
      />
    </section>
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

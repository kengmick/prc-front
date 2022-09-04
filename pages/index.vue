<template>
  <div>
    <div v-if="!loading" class="video-container">
      <iframe
        id="yt-video-iframe"
        class="video"
        :src="`https://www.youtube.com/embed/${this.video}`"
        title="Punk Rock Compound July 31st"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <section v-if="bands.length > 0">
      <h2 class="text-center my-10 text-5xl">Featured Bands</h2>
      <!-- container for poster cards -->
      <div
        class="flex flex-col justify-center items-center md:flex-row md:flex-wrap md:gap-6"
      >
        <PosterCard
          class="mb-10"
          v-for="(band, index) in bands"
          :key="band.bandName + index"
          :band="band"
          :isFeatured="true"
          :isHome="true"
        />
      </div>
      <!-- <SliderContainer v-if="bands !== []">
        <PosterCard
          v-for="(band, index) in bands"
          :key="band.bandName + index"
          :band="band"
          :isFeatured="true"
        />
      </SliderContainer> -->
    </section>

    <!-- <section class="my-10">
      <h2 class="chedder text-center text-5xl">Featured Event</h2>
      <FeaturedEvent v-if="event" :event="event" />
    </section> -->
    <section class="my-10">
      <Cta />
    </section>
    <!-- <section class="my-10">
      <Gallery />
    </section> -->
    <!-- <section>
      <NewsLetterCta />
    </section> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      bands: [],
      event: null,
      video: '',
      liveStream: null,
      liveUrl: '',
      loading: true,
    }
  },
  async fetch() {
    try {
      const link = await this.$strapi.find('live-stream')
      console.log(link.streamLink, 'from the db')
      this.liveUrl = link.streamLink
    } catch (error) {
      this.loading = false
      console.log(error)
    }
    try {
      this.liveStream = await this.$http.$get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${this.liveUrl}&key=${process.env.YOUTUBE_KEY}`
      )
      if (this.liveStream.items) {
        if (this.liveStream.items[0].snippet.liveBroadcastContent !== 'none') {
          console.log(this.liveStream.items)
          this.loading = false
          this.video = this.liveStream.items[0].id
        } else {
          this.video = 'jqsFw354asc'
          this.loading = false
          console.log(this.video, ' final video ')
        }
      }
    } catch (error) {
      this.loading = false
    }
  },
  async mounted() {
    try {
      this.bands = await this.$strapi.find('bands')
      this.event = await this.$strapi.find('featured-event')
    } catch (error) {
      return error
    }
  },
  methods: {
    log() {
      console.log('this is the event emited ')
    },
  },
}
</script>

<style scoped>
@media only screen and (max-width: 375px) {
  .video-container {
    position: relative;
    padding-bottom: 30vh;
    padding-top: 30px;
    max-height: 30vh;
    overflow: hidden;
  }
}
@media only screen and (min-width: 376px) {
  .video-container {
    position: relative;
    padding-bottom: 66vh;
    padding-top: 30px;
    max-height: 66vh;
    overflow: hidden;
  }
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

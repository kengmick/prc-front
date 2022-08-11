<template>
  <div>
    <div class="video-container">
      <iframe
        id="yt-video-iframe"
        class="video"
        width="1200"
        height="500"
        :src="`https://www.youtube.com/embed/jqsFw354asc`"
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
    <section>
      <NewsLetterCta />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bands: [],
      event: null,
      video: 'jqsFw354asc',
    }
  },
  async mounted() {
    try {
      this.bands = await this.$strapi.find('bands')
      this.event = await this.$strapi.find('featured-event')
    } catch (error) {
      return error
    }
    try {
      const link = await this.$strapi.find('live-stream')
      this.video = link.streamLink
      console.log(this.video, 'video')
    } catch (error) {
      console.log(error)
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
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
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

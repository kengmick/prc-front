<template>
  <div class="relative">
    <HeroAlt />
    <!-- <div class="hidden xl:block"><HeroAlt /></div>
    <div class="block xl:hidden"><Hero /></div> -->

    <!-- Featured bands -->
    <!-- <section>
      <h2 class="text-center my-10 text-5xl">Featured Bands</h2>
      <div
        v-if="bands !== []"
        class="flex flex-col items-center justify-center mx-auto xl:flex-row flex-wrap xl:w-auto gap-14"
      >
        <PosterCard
          v-for="(band, index) in bands.slice(0, 3)"
          :key="band.bandName + index"
          :band="band"
          :isFeatured="true"
          style="min-width: 25vw"
          class="hover:scale-110 transition-all duration-100"
          @dblclick="console.log('hello')"
        />
      </div>
    </section> -->
    <!-- this describes the pricing model  -->
    <!-- <Price /> -->
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

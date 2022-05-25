<template>
  <div>
    <Hero />
    <section>
      <h1 class="text-center my-10 text-5xl">Featured Bands</h1>
      <div>
        <Featbands :bands="bands.slice(0, 3)" />
      </div>
    </section>
    <section>
      <h1 class="text-center my-10 text-5xl">All bands</h1>
      <SliderContainer v-if="bands !== []">
        <BandCard
          v-for="(band, index) in bands"
          :key="band.bandName + index"
          :band="band"
        />
      </SliderContainer>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bands: [],
    }
  },
  async mounted() {
    try {
      this.bands = await this.$strapi.find('bands')
    } catch (error) {
      return error
    }
  },
}
</script>

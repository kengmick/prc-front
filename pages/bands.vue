<template>
  <div>
    <Title title="All Bands" />
    <section
      v-if="bands"
      class="mx-6 flex flex-col gap-10 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 xl:grid-cols-4"
    >
      <!-- <BandCard
        v-for="(band, index) in bands"
        :key="band.bandName + index"
        :band="band"
      /> -->
      <PosterCard
        v-for="(band, index) in bands"
        :key="band.bandName + index"
        :band="band"
        :isFeatured="true"
        style="min-width: 25vw"
      />
    </section>
    <div v-else>{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bands: [],
      errorMessage: '',
    }
  },
  async mounted() {
    try {
      const bands = await this.$strapi.find('bands')
      this.bands = bands
    } catch (error) {
      this.errorMessage = 'Sorry ... there was a problem'
    }
  },
}
</script>

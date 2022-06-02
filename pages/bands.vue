<template>
  <div>
    <h1 class="text-center text-5xl main_red_text mt-10">all bands</h1>
    <section
      v-if="bands"
      class="mx-6 my-10 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10"
    >
      <BandCard
        v-for="(band, index) in bands"
        :key="band.bandName + index"
        :band="band"
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

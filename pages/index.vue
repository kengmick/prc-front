<template>
  <div>
    <Hero />
    <section>
      <h1 class="text-center my-10">Featured Bands</h1>
      <div>
        <!-- <Featbands :bands="feats" /> -->
      </div>
    </section>
    <section>
      <h1 class="text-center my-10">All bands</h1>
      <h2>There may be the band array here</h2>
      <pre>{{ bands }}</pre>
      <!-- <BandCard :bands="bands" /> -->
    </section>
  </div>
</template>

<script>
export default {
  // async asyncData({ $strapi }) {
  //   try {
  //     const bands = await $strapi.find('bands')
  //     const event = await $strapi.find('featured-event')
  //     const videos = await $strapi.find('videos')
  //     const feats = bands.slice(0, 3)
  //     return {
  //       bands,
  //       feats,
  //       event,
  //       videos,
  //     }
  //   } catch (error) {
  //     return error
  //   }
  // },
  data() {
    return {
      bands: [] || {},
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

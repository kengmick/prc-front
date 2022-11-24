<template>
  <div>
    <section v-if="band">
      <section class="my-4">
        <h2 class="text-2xl text-center my-6">Pick a card to feature</h2>
        <SearchFeatured index="bands" />
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      band: null,
    }
  },
  async mounted() {
    try {
      const band = await this.$strapi.findOne('bands', this.$route.query.band)
      this.band = band
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style scoped>
.ais-SearchBox-input {
  height: 50px;
  padding: 1em 3em 1em 1em;
}
.ais-SearchBox-submitIcon {
  height: 18px;
  width: 18px;
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: -3px;
}
</style>

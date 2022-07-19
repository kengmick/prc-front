<template>
  <div v-if="$strapi.user">
    <h1 class="text-center">Favorite Bands</h1>
    <section v-if="favBands" class="grid grid-cols-3">
      <PosterCard
        v-for="(band, index) in favBands"
        :key="band.bandName + index"
        :band="band"
        :isFeatured="true"
      />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favBands: [],
      ids: null,
    }
  },
  async mounted() {
    const user = await this.$strapi.user
    const ids = await user.favs.map((f) => {
      return ['id', f.favObject.id]
    })
    if (user.favs.length === 0) {
      return (this.favBands = [])
    }
    this.favBands = await this.$strapi.find('bands', [...ids])
  },
}
</script>

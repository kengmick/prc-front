<template>
  <div>
    <h1>This is the album Page</h1>
    <p>this is the band</p>
    <pre>{{ album }}</pre>
    <p>This is the collection</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      band: {},
      album: {},
    }
  },

  async mounted() {
    try {
      const band = await this.$strapi.findOne('bands', this.$route.query.band)
      const album = band.album.filter((album, index) => {
        return album.id === parseInt(this.$route.query.album)
      })
      this.album = album[0]
      this.band = band
    } catch (error) {
      return error
    }
  },
}
</script>

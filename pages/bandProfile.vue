<template>
  <div>
    <h1>This is the band profile page ...</h1>
    <pre>{{ band }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      band: {},
    }
  },
  async mounted() {
    try {
      this.band = await this.$strapi.findOne('bands', this.$route.query.band)
    } catch (error) {
      return error
    }
  },
}
</script>

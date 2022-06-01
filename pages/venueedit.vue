<template>
  <div>
    <div v-if="venue">
      <h1>This is the venue edit page</h1>
      <p>{{ venue }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      venue: {},
    }
  },
  async mounted() {
    try {
      this.venue = await this.$strapi.findOne('venues', this.$route.query.venue)
    } catch (error) {
      this.$nuxt.error({ statusCode: 404, message: error })
    }
  },
}
</script>

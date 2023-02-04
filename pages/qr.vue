<template>
  <div v-if="route" class="my-10 mx-4">
    <Qrcode :width="300" :height="300" :color="colors.bands" :data="route" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: null,
      colors: {
        bands: '#27ED5E',
      },
    }
  },
  mounted() {
    this.route = this.$route.query.route
  },
}
</script>

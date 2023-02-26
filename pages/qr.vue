<template>
  <div v-if="route" class="h-[calc(100vh-140px)] flex items-center">
    <Qrcode :width="300" :height="300" :color="colors.bands" :data="route" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: null,
      colors: {
        bands: '#000000',
      },
    }
  },
  mounted() {
    this.route = this.$route.query.route
  },
}
</script>

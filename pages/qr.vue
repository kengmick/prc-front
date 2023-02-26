<template>
  <div v-if="route" class="h-[calc(100vh-140px)] flex items-center bg-gray-900">
    <Qrcode :width="250" :height="250" :color="colors.bands" :data="route" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: null,
      colors: {
        bands: '#ef4444',
      },
    }
  },
  mounted() {
    this.route = this.$route.query.route
  },
}
</script>

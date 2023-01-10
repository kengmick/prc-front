<template>
  <div v-if="type" class="my-10 mx-4">
    <Qrcode
      :width="300"
      :height="300"
      :color="colors.bands"
      :data="`https://punkrockcompound.com/${type}`"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: null,
      colors: {
        bands: '#27ED5E',
      },
    }
  },
  mounted() {
    this.type = this.$route.query.type
  },
}
</script>

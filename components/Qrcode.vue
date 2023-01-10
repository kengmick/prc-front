<template>
  <div class="mx-auto flex justify-center" id="qr-code" ref="qrCode"></div>
</template>

<script>
import QRCodeStyling from 'qr-code-styling'

export default {
  props: {
    color: {
      type: String,
      default: () => {
        return '#c10609'
      },
    },
    width: {
      type: Number,
      default: () => {
        return 300
      },
    },
    height: {
      type: Number,
      default: () => {
        return 300
      },
    },
    data: {
      type: String,
      default: () => {
        return 'https://punkrockcompound.com'
      },
    },
  },
  data() {
    return {
      qrCode: null,
    }
  },
  mounted() {
    this.qrCode = new QRCodeStyling({
      width: this.width,
      height: this.height,
      type: 'svg',
      data: this.data,
      dotsOptions: {
        color: this.color,
        type: 'squared',
      },
    })
    this.qrCode.append(this.$refs.qrCode)
  },
}
</script>

<style lang="scss" scoped></style>

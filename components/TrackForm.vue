<template>
  <div v-if="show">
    <h3 class="text-center">This is the track from</h3>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>

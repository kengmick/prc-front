<template>
  <div class="bg-black py-4 shaddow-sm px-4 cursor-pointer">
    <p class="text-white text-center text-xl font-semibold">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default() {
        return ''
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>

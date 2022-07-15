<template>
  <div class="bg-black py-2 px-4">
    <p class="text-white text-center text-[13px]">{{ text }}</p>
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

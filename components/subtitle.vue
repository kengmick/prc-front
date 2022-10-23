<template>
  <div>
    <p class="chedder text-[#9397ab] text-[12px]">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <h1 class="text-center text-5xl main_red_text my-10">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>

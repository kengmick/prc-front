<template>
  <div>
    <h1 class="text-center">Merch view</h1>
    <section v-if="band">
      <p>this is the band</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      merch: [],
      band: null,
    }
  },
  async mounted() {},
}
</script>

<style lang="scss" scoped></style>

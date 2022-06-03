<template>
  <div>
    <h1>This is the distro page !!!!!</h1>
    <section v-if="distros">
      <pre>{{ distros }}</pre>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distros: [],
    }
  },
  async mounted() {
    const distros = await this.$strapi.find('record-labels')
    this.distros = distros
  },
}
</script>

<template>
  <div>
    <h1 class="text-center chedder main_red_text">This is the venue page</h1>
    <section v-if="venues">
      <pre>{{ venues }}</pre>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      venues: [],
    }
  },
  async mounted() {
    const venues = await this.$strapi.find('venues')
    this.venues = venues
  },
}
</script>

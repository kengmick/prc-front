<template>
  <div>
    <h1 class="text-center text-5xl main_red_text mt-10">All Venues</h1>
    <section
      v-if="venues"
      class="mx-6 my-10 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10"
    >
      <VenueCard
        v-for="(venue, index) in venues"
        :key="venue.name + index"
        :venue="venue"
      />
    </section>
    <div v-else>{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      venues: [],
      errorMessage: '',
    }
  },
  async mounted() {
    try {
      const venues = await this.$strapi.find('venues')
      this.venues = venues
    } catch (error) {
      this.errorMessage = 'Sorry ... there was a problem'
    }
  },
}
</script>

<template>
  <div>
    <Title title="Venues" />
    <section
      v-if="venues"
      class="mx-6flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10 xl:grid-cols-5"
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

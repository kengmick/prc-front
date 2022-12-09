<template>
  <div>
    <Title title="Venues" />
    <section class="px-4">
      <Search index="venue" />
    </section>
    <section v-if="venues" class="container mx-auto">
      <div
        class="mx-6 flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10"
      >
        <CardsVenueCard
          v-for="venue in venues"
          :key="venue.name"
          :venue="venue"
        />
      </div>
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

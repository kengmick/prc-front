<template>
  <div v-if="tours">
    <Title title="Tours" />
    <section class="px-4">
      <!-- <Search index="tours" /> -->
    </section>
    <section class="container mx-auto">
      <section
        class="mx-6 flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10"
      >
        <CardsTourCard v-for="tour in tours" :tour="tour" :key="tour.name" />
      </section>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tours: '',
    }
  },
  async mounted() {
    const tours = await this.$strapi.find('tours')
    this.tours = tours
  },

  methods: {
    moment,
  },
}
</script>

<style lang="scss" scoped></style>

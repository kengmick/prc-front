<template>
  <div v-if="tours">
    <Title title="Tours" />
    <section class="container mx-auto">
      <div
        v-for="(tour, index) in tours"
        :key="tour.title + index"
        class="shadow-md w-full h-full flex flex-col ms:h-64 sm:my-12 sm:mx-auto sm:flex-row transition-all duration-200 hover:scale-105"
      >
        <div v-if="tour.touringPoster" class="w-full sm:w-1/3 h-64">
          <img
            class="h-full w-full object-cover"
            :src="tour.touringPoster.url"
            alt=""
          />
        </div>
        <div class="p-6 flex">
          <div>
            <p class="chedder text-xl inline sm:text-center sm:block">
              {{ moment(String(tour.dateStart)).format('MMM') }}
              {{ moment(String(tour.dateStart)).format('Do') }}
              <span class="chedder main_red_text mx-4">-</span>
            </p>
          </div>
          <div>
            <p class="chedder text-xl inline sm:text-center sm:block">
              {{ moment(String(tour.dateEnd)).format('MMM') }}
              {{ moment(String(tour.dateEnd)).format('Do') }}
            </p>
          </div>
        </div>
        <div class="flex flex-col flex-grow p-6">
          <div>
            <p v-if="tour.title" class="chedder text-2xl">
              {{ tour.title }}
            </p>
            <div v-if="tour.touringBands">
              <h2 class="main_red_text text-xl mt-4 sm:mt-0">Featuring</h2>
              <p v-for="band in tour.touringBands" :key="band + index">
                {{ band.bandName }}
              </p>
            </div>
          </div>
          <div class="flex-grow flex items-center my-4 sm:my-0">
            <NuxtLink
              :to="{ path: 'tourview', query: { tour: tour.id } }"
              class="border-2 border-black px-4 py-2"
              >View tour</NuxtLink
            >
          </div>
        </div>
      </div>
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

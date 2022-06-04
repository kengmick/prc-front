<template>
  <div v-if="tours">
    <h1 class="text-5xl text-center main_red_text my-6">Tours</h1>
    <section class="container mx-auto">
      <div
        v-for="(tour, index) in tours"
        :key="tour.title + index"
        class="shadow-md w-full h-64 my-12 mx-auto flex transition-all duration-200 hover:scale-105"
      >
        <div v-if="tour.touringPoster" class="w-1/3 h-64">
          <img
            class="h-full w-full object-cover"
            :src="tour.touringPoster.url"
            alt=""
          />
        </div>
        <div class="p-6 flex">
          <div>
            <p class="chedder text-xl text-center">
              {{ moment(String(tour.dateStart)).format('MMM') }}
              {{ moment(String(tour.dateStart)).format('Do') }}
              <span class="chedder main_red_text mx-4">-</span>
            </p>
          </div>
          <div>
            <p class="chedder text-xl text-center">
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
              <h2 class="main_red_text text-xl">Featuring</h2>
              <p v-for="band in tour.touringBands" :key="band + index">
                {{ band.bandName }}
              </p>
            </div>
          </div>
          <div class="flex-grow flex items-center">
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

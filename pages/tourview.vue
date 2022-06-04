<template>
  <div>
    <div v-if="tour" class="container mx-auto">
      <h1 class="hidden sm:block main_red_text text-center my-6">
        {{ tour.title }}
      </h1>
      <div v-if="tour.touringPoster" class="mb-10">
        <img
          :src="tour.touringPoster.formats.large.url"
          alt=""
          class="mx-auto"
        />
      </div>
      <h2 class="hidden sm:block text-xl sm:text-2xl main_red_text mb-2">
        On Tour
      </h2>
      <h2 class="block sm:hidden text-xl sm:text-2xl main_red_text">
        {{ tour.title }}
      </h2>
      <p class="chedder text-xl sm:text-2xl">
        {{ moment(String(tour.dateStart)).format('MMM') }}
        {{ moment(String(tour.dateStart)).format('Do') }}
        <span class="chedder main_red_text mx-4">-</span>
        {{ moment(String(tour.dateEnd)).format('MMM') }}
        {{ moment(String(tour.dateEnd)).format('Do') }}
      </p>
    </div>

    <!-- events -->
    <div v-if="tour.tourEvents">
      <h1 class="text-5xl text-center main_red_text my-6">Showz</h1>
      <section class="container mx-auto">
        <div
          v-for="(event, index) in tour.tourEvents"
          :key="event.title + index"
          class="shadow-md w-full h-64 my-12 mx-auto flex transition-all duration-200 hover:scale-105"
        >
          <div v-if="event.eventPoster" class="w-1/3 h-64">
            <img
              class="h-full w-full object-cover"
              :src="event.eventPoster.url"
              alt=""
            />
          </div>
          <div class="p-6">
            <p class="chedder text-xl text-center">
              {{ moment(String(event.date)).format('MMM') }}
            </p>
            <p class="chedder text-xl text-center">
              {{ moment(String(event.date)).format('Do') }}
            </p>
          </div>
          <div class="flex flex-col flex-grow p-6">
            <div>
              <p v-if="event.title" class="chedder text-2xl">
                {{ event.title }}
              </p>
              <p v-if="event.headlinerOne" class="text-xl font-black pb-2">
                Featuring {{ event.headlinerOne }}
              </p>
              <p v-if="event.streetAddress && event.streetName" class="text-xl">
                The Vic, {{ event.streetAddress }} {{ event.streetName }} /
                {{ moment(String(event.date)).format('LT') }} -
                {{ moment(event.timeEnds, 'h').format('LT') }}
              </p>
              <p v-if="event.city && event.state" class="text-xl">
                {{ event.city }}, {{ event.state }}
              </p>
            </div>
            <div class="flex-grow flex items-center">
              <NuxtLink
                :to="{
                  path: 'toureventview',
                  query: { event: event.id, tour: tour.id },
                }"
                class="border-2 border-black px-4 py-2"
                >View Event</NuxtLink
              >
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tour: {},
      touringPoster: '',
    }
  },
  async mounted() {
    try {
      const tour = await this.$strapi.findOne('tours', this.$route.query.tour)
      this.tour = tour
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    moment,
  },
}
</script>

<style lang="scss" scoped></style>

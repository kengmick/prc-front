<template>
  <div>
    <section v-if="event">
      <section v-if="event && event.eventPoster" class="container mx-auto mt-6">
        <img :src="image" alt="" class="mx-auto h-[400px] object-cover" />
        <section>
          <h2 class="mt-4">Date</h2>
          <p class="text-xl">
            {{ moment(String(event.date)).format('MMMM Do YYYY') }} @
            {{ moment(event.timeStart).format('LT') }}
          </p>

          <a
            v-if="event.ticketLink"
            class="px-4 py-2 border-2 border-black inline-block mt-4"
            target="_blank"
            :href="event.ticketLink"
            >Tickets</a
          >
        </section>
        <h2 class="mt-4">Location</h2>
        <p class="mt-4 ext-lg px-2 md:text-2xl">{{ event.venueName }}</p>
        <h2 class="mt-4">Description</h2>
        <div v-if="event.eventDescription" class="mt-6">
          <div v-if="event.eventDescription.split('\n').length > 1">
            <p
              v-for="(description, index) in event.eventDescription.split('\n')"
              :key="description + index"
              class="mt-4 ext-lg px-2 md:text-2xl"
            >
              {{ description }}
            </p>
          </div>
          <p v-else class="text-lg px-2 md:text-2xl">
            {{ event.eventDescription }}
          </p>
        </div>

        <div v-if="event.bandsPlaying">
          <h2 class="mt-4">All Bands</h2>
          <ul>
            <li
              v-for="(band, index) in event.bandsPlaying"
              :key="band + index"
              class="chedder text-xl"
            >
              {{ band.BandName }}
            </li>
          </ul>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      event: null,
      image: '',
    }
  },
  async mounted() {
    const tour = await this.$strapi.findOne('tours', this.$route.query.tour)
    this.tour = tour
    const [event] = tour.tourEvents.filter((event) => {
      return event.id === parseInt(this.$route.query.event)
    })
    this.event = event
    this.image = event.eventPoster.url
  },
  methods: {
    moment,
  },
}
</script>

<style lang="scss" scoped></style>

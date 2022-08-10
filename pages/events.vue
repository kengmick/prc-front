<template>
  <section class="container mx-auto">
    <Title title="Showz" />
    <div v-if="events" class="container mx-auto">
      <section v-if="events.length > 0" class="container mx-auto">
        <div
          v-for="(event, index) in events"
          :key="event.title + index"
          class="shadow-md w-full min-h-64 my-12 mx-auto flex flex-col sm:flex-row transition-all duration-200 hover:scale-105"
        >
          <div v-if="event.eventPoster" class="w-full sm:w-1/2 h-64">
            <img
              class="h-full w-full object-cover"
              :src="event.eventPoster.url"
              alt=""
            />
          </div>
          <div class="p-6">
            <p class="chedder text-xl text-center inline-block sm:block">
              {{ moment(String(event.date)).format('MMM') }}
            </p>
            <p class="chedder text-xl text-center inline-block sm:block">
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
              <p v-if="event.streetAddress" class="text-xl">
                The Vic, {{ event.streetAddress }} /
                {{ moment(String(event.date)).format('MMMM Do YYYY') }}
                @{{ moment(event.timeStarts, 'h').format('LT') }}
              </p>
              <p v-if="event.city && event.state" class="text-xl">
                {{ event.city }}, {{ event.state }}
              </p>
            </div>
            <div class="flex-grow flex items-center mt-6 sm:mt-2">
              <NuxtLink
                :to="{
                  path: 'eventview',
                  query: { event: event.id },
                }"
                class="border-2 border-black px-4 py-2"
                >View Event</NuxtLink
              >
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="container mx-auto">
      <div v-if="oldEvents" class="container mx-auto">
        <section v-if="oldEvents.length > 0" class="container mx-auto">
          <h2 class="text-center">Previous Showz</h2>
          <div
            v-for="(event, index) in oldEvents"
            :key="event.title + index"
            class="shadow-md w-full min-h-64 my-12 mx-auto flex flex-col sm:flex-row transition-all duration-200 hover:scale-105"
          >
            <div v-if="event.eventPoster" class="w-full sm:w-1/2 h-64">
              <img
                class="h-full w-full object-cover"
                :src="event.eventPoster.url"
                alt=""
              />
            </div>
            <div class="p-6">
              <p class="chedder text-xl text-center inline-block sm:block">
                {{ moment(String(event.date)).format('MMM') }}
              </p>
              <p class="chedder text-xl text-center inline-block sm:block">
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
                <p v-if="event.streetAddress" class="text-xl">
                  The Vic, {{ event.streetAddress }} /
                  {{ moment(String(event.date)).format('MMMM Do YYYY') }}
                  @{{ moment(event.timeStarts, 'h').format('LT') }}
                </p>
                <p v-if="event.city && event.state" class="text-xl">
                  {{ event.city }}, {{ event.state }}
                </p>
              </div>
              <div class="flex-grow flex items-center mt-6 sm:mt-2">
                <NuxtLink
                  :to="{
                    path: 'eventview',
                    query: { event: event.id },
                  }"
                  class="border-2 border-black px-4 py-2"
                  >View Event</NuxtLink
                >
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section v-if="errorMessage">{{ errorMessage }}</section>
  </section>
  <!-- <div v-if="events">
    <h1 class="text-5xl text-center main_red_text my-6">Showz</h1>
    <section class="container mx-auto">
      <div
        v-for="(event, index) in events"
        :key="events.title + index"
        class="shadow-md w-full h-full flex flex-col ms:h-64 sm:my-12 sm:mx-auto sm:flex-row transition-all duration-200 hover:scale-105"
      >
        <div v-if="event.eventPoster" class="w-full sm:w-1/3 h-64">
          <img
            class="h-full w-full object-cover"
            :src="event.eventPoster.url"
            alt=""
          />
        </div>
        <div class="p-6">
          <p class="chedder text-xl inline sm:text-center sm:block">
            {{ moment(String(event.date)).format('MMM') }}
          </p>
          <p class="chedder text-xl inline sm:text-center sm:block">
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
          <div class="flex-grow flex items-center my-4 sm:my-0">
            <NuxtLink
              :to="{ path: 'eventview', query: { event: event.id } }"
              class="border-2 border-black px-4 py-2"
              >View Event</NuxtLink
            >
          </div>
        </div>
      </div>
    </section>
  </div> -->
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      events: '',
      oldEvents: '',
      errorMessage: '',
    }
  },
  async mounted() {
    try {
      const events = await this.$strapi.find('events')
      const upcomingEvents = events.filter((e) => {
        console.log(moment(e.date).toISOString())
        return moment(e.date).toISOString() >= moment().toISOString()
      })
      const oldShows = events.filter((e) => {
        return moment(e.date).toISOString() < moment().toISOString()
      })
      this.oldEvents = oldShows.sort((a, b) => {
        return moment.utc(a.date).diff(moment.utc(b.date))
      })
      this.events = upcomingEvents.sort((a, b) => {
        return moment.utc(a.date).diff(moment.utc(b.date))
      })
    } catch (error) {
      console.log(error)
      this.errorMessage = 'Sorry there are no events'
    }
    // this means that the events are upcoming
  },

  methods: {
    moment,
  },
}
</script>

<style lang="scss" scoped></style>

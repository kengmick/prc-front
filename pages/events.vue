<template>
  <div v-if="events">
    <h1 class="text-5xl text-center main_red_text">Events</h1>
    <section>
      <div v-for="(event, index) in events" :key="events.title + index">
        <p>{{ event.title }}</p>
      </div>
    </section>
    <pre>{{ events }}</pre>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      events: '',
    }
  },
  async mounted() {
    const events = await this.$strapi.find('events')
    this.events = events
  },

  methods: {
    moment,
  },
}
</script>

<style lang="scss" scoped></style>

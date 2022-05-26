<template>
  <div class="flex flex-col xl:flex-row mx-auto w-4/5">
    <div class="flex-grow w-full lg:pr-10">
      <img
        class="mx-auto"
        style="width: 433px"
        :src="event.eventPoster.url"
        alt=""
      />
    </div>
    <div>
      <h2 class="mb-10">{{ event.title }}!</h2>
      <div>
        <p class="inline chedder text-2xl">
          {{ event.city }}, {{ event.state }}
        </p>
        <div class="line inline-block mx-2"></div>
        <p class="inline-block chedder text-2xl">{{ event.venueName }}</p>
      </div>
      <p class="chedder text-2xl">{{ date }} {{ time }}</p>
      <p class="pt-10 text-xl">{{ event.eventDescription }}</p>
      <h2 class="my-10">Headlining Bands</h2>
      <p class="pb-4 text-xl" v-if="event.headlinerOne">
        {{ event.headlinerOne }}
      </p>
      <p class="text-xl" v-if="event.headlinerTwo">{{ event.headlinerTwo }}</p>
      <div class="ticketButton">Tickets</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    event: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    date: function () {
      const dateData = this.event.date.toString()
      return moment(String(dateData)).format('MMM Do')
    },
    time: function () {
      const dateData = this.event.date.toString()
      return moment(String(dateData)).format('hh:mm a')
    },
  },
}
</script>

<style scoped>
.line {
  width: 5px;
  height: 30px;
  margin-bottom: -4px;
  background: black;
}
.ticketButton {
  padding: 1em 2em;
  background: black;
  color: white;
  text-align: center;
  margin-top: 2em;
}
</style>

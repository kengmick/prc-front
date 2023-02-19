<template>
  <div v-if="event" class="w-full h-full bg-slate-100 shadow-md rounded-b-md">
    <div class="h-[180px] w-full">
      <NuxtImg
        class="object-fill h-[180px] w-full"
        :src="event.eventPoster.url"
        alt=""
      />
    </div>
    <div>
      <p class="text-lg chedder p-2">{{ event.title }}</p>
    </div>
    <div class="p-2">
      <p class="lato text-sm">{{ event.city }}, {{ event.state }}</p>
      <p class="lato text-sm">
        {{ moment(String(event.date)).format('MMM') }}
        {{ moment(String(event.date)).format('Do') }}
        {{
          moment(String(`${event.date} ${event.timeStarts}`)).format('h:mm a')
        }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    event: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
  methods: {
    moment,
  },
}
</script>

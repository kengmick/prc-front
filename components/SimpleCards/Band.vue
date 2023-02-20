<template>
  <div v-if="band" class="w-full h-full bg-slate-100 shadow-md rounded-b-md">
    <NuxtLink :to="{ path: '/bands/bandprofile', query: { band: band.id } }">
      <div v-if="band.bandProfileImg" class="h-[180px] w-full">
        <NuxtImg
          class="object-fill h-[180px] w-full"
          :src="band.bandProfileImg.url"
          alt=""
        />
      </div>
      <div>
        <p class="text-lg chedder p-2">{{ band.bandName }}</p>
      </div>
      <div class="p-2">
        <p class="lato text-sm">{{ band.city }}, {{ band.state }}</p>
        <p class="lato text-sm">
          {{ moment(String(band.dateStarted)).format('MMMM Do YYYY') }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    band: {
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

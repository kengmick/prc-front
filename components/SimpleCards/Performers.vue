<template>
  <div
    v-if="performer"
    class="w-full min-h-[310px] bg-slate-100 shadow-md rounded-b-md"
  >
    <div v-if="performer.image" class="h-[180px] w-full">
      <NuxtImg
        class="object-fill h-[180px] w-full"
        :src="performer.image.url"
        alt=""
      />
    </div>
    <div>
      <p class="text-lg chedder p-2">{{ performer.name }}</p>
    </div>
    <div class="p-2">
      <p class="lato text-sm">
        ( {{ performer.dateStart }} - {{ performer.dateEnd }})
      </p>
      <ul v-if="performer.instruments.length > 0">
        <li v-for="instrument in performer.instruments" :key="instrument.id">
          <p>{{ instrument.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    performer: {
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

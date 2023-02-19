<template>
  <div v-if="release" class="w-full h-full bg-slate-100 shadow-md rounded-b-md">
    <div class="h-[180px] w-full">
      <NuxtImg
        class="object-fill h-[180px] w-full"
        :src="release.mainImage.url"
        alt=""
      />
    </div>
    <div class="min-h-[80px]">
      <div>
        <p class="text-lg chedder p-2">{{ release.title }}</p>
      </div>
      <div class="p-2">
        <p class="lato text-sm">{{ release.date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    release: {
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

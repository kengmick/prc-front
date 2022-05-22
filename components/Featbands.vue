<template>
  <div class="flex gap-10 justify-center">
    <div
      class="bg-green-300 image object-cover w-[25vw] h-64 relative"
      :style="`background-image: url(${band.bandProfileImg.url}); background-size: cover; background-position: center center;`"
      v-for="(band, index) in bands"
      :key="band + index"
    >
      <p class="text-2xl text-white text-center">{{ band.bandName }}</p>
      <div class="bg-black absolute bottom-0 w-full">
        <h2 class="text-white text-center">View Link</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bands: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

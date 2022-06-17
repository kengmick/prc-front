<template>
  <div>
    <div v-if="band.bandProfileImg">
      <div
        class="relative rounded-md shadow-md transition-all duration-200 hover:scale-105 back"
        :style="`background-image: url(${band.bandProfileImg.url})`"
      >
        <div
          class="flex justify-between items-center bg-black absolute bottom-0 w-full px-4 py-8"
        >
          <h2 class="text-2xl text-white">
            {{ band.bandName }}
          </h2>
          <NuxtLink :to="{ path: '/bandprofile', query: { band: band.id } }">
            <h2 class="text-2xl text-white">View Profile</h2>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="relative rounded-md shadow-md transition-all duration-200 hover:scale-105 back bg-black flex items-center justify-center"
      >
        <img src="~/static/imageIcon.svg" alt="" />
        <div
          class="flex justify-between items-center bg-black absolute bottom-0 w-full px-4 py-8"
        >
          <h2 class="text-2xl text-white">
            {{ band.bandName }}
          </h2>
          <NuxtLink :to="{ path: '/bandprofile', query: { band: band.id } }">
            <h2 class="text-2xl text-white">View Profile</h2>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    band: {
      type: Object,
      default() {
        return {}
      },
    },
    userProfile: {
      type: Boolean,
      default() {
        return false
      },
    },
    isFeatured: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
}
</script>

<style scoped>
.back {
  background-position: center;
  background-size: cover;
  object-fit: fill;
  height: 400px;
}
.featuredBackground {
  background-position: center;
  background-size: cover;
  object-fit: fill;
  height: 700px;
}
.outline-button {
  padding: 0.5em 1em;
  border: 1px solid white;
  border-radius: 5px;
}
</style>

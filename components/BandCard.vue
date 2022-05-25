<template>
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
  },
}
</script>

<style scoped>
.back {
  background-position: center;
  background-size: cover;
  object-fit: fill;
  min-width: 300px;
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
@media (min-width: 1000px) {
  .back {
    min-width: 500px;
  }
} ;
</style>

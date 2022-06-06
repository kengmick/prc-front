<template>
  <div
    class="relative rounded-md shadow-md transition-all duration-200 hover:scale-105 back"
    :style="`background-image: url(${album.albumCover.url})`"
  >
    <div
      class="flex justify-between items-center bg-black absolute bottom-0 w-full px-4 py-8"
    >
      <div>
        <h2 class="text-2xl text-white">{{ album.title }}</h2>
        <p class="text-xl chedder text-white">
          Released {{ album.dateReleased }}
        </p>
      </div>
      <NuxtLink
        :to="{
          path: '/album',
          query: { album: album.id, band: band },
        }"
      >
        <h2 class="text-xl text-white border-2 border-white px-4 py-2">
          View Album
        </h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  //   :style="`background-image: url(${album.albumCover.url})`"
  props: {
    album: {
      type: Object,
      default() {
        return {}
      },
    },
    band: {
      type: Number,
      default() {
        return null
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
  width: 300px;
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
}
@media only screen and (max-width: 400px) {
  .back {
    max-width: 100vw !important;
  }
} ;
</style>

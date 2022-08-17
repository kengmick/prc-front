<template>
  <div>
    <div v-if="band.bandProfileImg">
      <div
        class="relative rounded-md shadow-md transition-all duration-200 hover:scale-105 back"
        :style="`background-image: url(${band.bandProfileImg.url})`"
      >
        <div
          class="flex items-center bg-black absolute bottom-0 w-full px-4 py-8"
        >
          <h2 class="text-2xl text-white flex-grow">
            {{ band.bandName }}
          </h2>

          <NuxtLink :to="{ path: '/bandprofile', query: { band: band.id } }">
            <h2 class="text-2xl text-white">View Profile</h2>
          </NuxtLink>
          <div class="pl-6 cursor-pointer" @click="removeBand(band.id)">
            <h2 class="text-2xl text-white">Delete</h2>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="relative rounded-md shadow-md transition-all duration-200 hover:scale-105 back bg-black flex items-center justify-center"
      >
        <img src="~/static/imageIcon.svg" alt="" />
        <div
          class="flex items-center bg-black absolute bottom-0 w-full px-4 py-8"
        >
          <h2 class="text-2xl text-white flex-grow cursor-pointer">
            {{ band.bandName }}
          </h2>
          <NuxtLink :to="{ path: '/bandprofile', query: { band: band.id } }">
            <h2 class="text-2xl text-white">View Profile</h2>
          </NuxtLink>
          <div class="pl-6 cursor-pointer" @click="removeBand(band.id)">
            <h2 class="text-2xl text-white">Delete</h2>
          </div>
        </div>
      </div>
    </div>
    <section
      v-if="popUp"
      style="z-index: 99999999"
      class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
    >
      <div>
        <section class="w-11/12 min-h-[66vh] bg-white py-12">
          <div
            class="flex items-center justify-center p-[.8em] w-11/12 mx-auto sm:w-3/4 lg:w-1/2 mt-4 bg-black"
          >
            <p class="text-white">Remove Permanently</p>
          </div>
          <div
            class="flex items-center justify-center p-[.8em] w-11/12 mx-auto sm:w-3/4 lg:w-1/2 mt-4 bg-black"
          >
            <p @click="cancelRemoveBand" class="text-white">Cancel</p>
          </div>
        </section>
      </div>
    </section>
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
  data() {
    return {
      popUp: false,
    }
  },
  methods: {
    removeBand(bandId) {
      console.log('this is the delete function')
      this.popUp = true
    },
    cancelRemoveBand() {
      this.popUp = false
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

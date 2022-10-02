<template>
  <div
    class="rounded-md shadow-md transition-all duration-200 hover:scale-105 h-[500px]"
  >
    <div class="h-1/6">
      <p class="chedder text-2xl main_red_text p-6">{{ venue.name }}</p>
    </div>
    <NuxtLink :to="{ path: 'venueprofile', query: { venue: venue.id } }">
      <div v-if="venue.venueImg" class="w-full h-3/6">
        <img
          class="h-full w-full object-cover"
          :src="venue.venueImg.url"
          alt=""
        />
      </div>

      <div
        v-else
        class="w-full h-3/6 flex justify-center items-center bg-black"
      >
        <img src="~static/imageIcon.svg" alt="" />
      </div>
    </NuxtLink>
    <div v-if="venue.description" class="h-1/6 pl-6 flex items-center">
      <p>{{ venue.description.split(' ').slice(0, 10).join(' ') }} ...</p>
    </div>
    <div v-else class="h-1/6 pl-6 flex items-center">
      <p>{{ venue.description }}</p>
    </div>
    <div class="h-1/6 pl-6 flex items-center">
      <NuxtLink
        class="chedder px-4 py-2 border-2 border-black"
        :to="{ path: 'venueprofile', query: { venue: venue.id } }"
        >View Venue</NuxtLink
      >
      <!-- emits event to parent with dataType and id  -->
      <div
        class="chedder border-2 border-black ml-4 px-4 py-2"
        @click="removeVenue('venues', venue.id)"
      >
        Delete
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    venue: {
      type: Object,
      default() {
        return {}
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
    removeVenue() {
      this.$emit('removeVenue', 'venues', this.venue.id)
    },
  },
}
</script>

<style scoped>
.outline-button {
  padding: 0.5em 1em;
  border: 1px solid white;
  border-radius: 5px;
}
</style>

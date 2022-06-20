<template>
  <div
    class="rounded-md shadow-md transition-all duration-200 hover:scale-105 h-[500px]"
  >
    <div class="h-1/6">
      <p class="chedder text-2xl main_red_text p-6">{{ distro.name }}</p>
    </div>
    <div v-if="distro.distroImage" class="w-full h-3/6">
      <img
        class="h-full w-full object-cover"
        :src="distro.distroImage.url"
        alt=""
      />
    </div>
    <div v-if="distro.description" class="h-1/6 pl-6 flex items-center">
      <p v-if="distro.description.split('/n')">
        {{ distro.description.split(' ').slice(0, 10).join(' ') }} ...
      </p>
    </div>
    <div v-else class="h-1/6 pl-6 flex items-center">
      <p>{{ distro.description }}</p>
    </div>
    <div class="h-1/6 pl-6 flex items-center">
      <NuxtLink
        class="main_red_text chedder px-4 py-2 border-2 border-black"
        :to="{ path: 'distroview', query: { distro: distro.id } }"
        >View distro</NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    distro: {
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
}
</script>

<style scoped>
.outline-button {
  padding: 0.5em 1em;
  border: 1px solid white;
  border-radius: 5px;
}
</style>

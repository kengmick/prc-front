<template>
  <div class="w-full">
    <section class="flex">
      <h2 class="w-[33.3333%] text-3xl">Track</h2>
      <h2 class="w-[33.3333%] text-center text-3xl">Title</h2>
      <h2 class="w-[33.3333%] text-right text-3xl">Favorite</h2>
    </section>
    <Border class="mt-1" />
    <section
      v-for="track in tracks"
      :key="track.title"
      class="flex items-center h-24"
    >
      <div class="w-[33.3333%]">
        <svg
          width="25"
          height="26"
          viewBox="0 0 28 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0V28.7425L27.0417 14.3712L0 0Z" fill="#FF0000" />
        </svg>
      </div>
      <div class="w-[33.3333%]">
        <p class="text-center chedder">{{ track.title }}</p>
      </div>
      <div class="w-[33.3333%] flex justify-end">
        <img src="~/static/heart.png" alt="" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    tracks: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>

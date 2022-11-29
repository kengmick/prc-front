<template>
  <div
    class="fixed top-0 left-0 w-[100vw] h-full bg-gray-900 bg-opacity-90 flex justify-center items-center"
  >
    <div
      class="w-10/12 h-1/3 bg-white text-black flex flex-col justify-between items-center py-12 rounded-sm"
    >
      <p class="chedder text-center text-lg">Please sign in to continue</p>
      <div
        class="bg-black text-white px-4 py-2 flex justify-center items-center"
      >
        <NuxtLink
          :to="{
            path: 'loginuser',
            query: {
              addCard: true,
              routeData: { path: '/addCardPage', query: { band: '77' } },
            },
          }"
          >Sign In</NuxtLink
        >
      </div>
      <div
        class="bg-black text-white px-4 py-2 flex justify-center items-center"
      >
        <div @click="$emit('close')">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>

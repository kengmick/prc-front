<template>
  <div
    v-if="pic"
    class="fixed top-0 left-0 h-screen w-screen bg-black flex justify-center items-center"
  >
    <nuxt-img format="webp" preload :src="pic" />
    <div class="fixed bottom-10 right-10 text-red-500 text-xl" @click="close">
      X
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pic: {
      type: String,
      default: () => {
        return null
      },
    },
  },
  methods: {
    close() {
      this.$emit('closePhoto')
    },
  },
}
</script>

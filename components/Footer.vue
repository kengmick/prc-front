<template>
  <div
    class="w-full h-[80px] bg-black flex items-center justify-center fixed bottom-0"
    :class="{ 'h-[40px]': isProfilePage }"
  >
    <!-- Temp footer  -->
    <h4 class="text-white text-lg">Punk Rock Compound</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isProfilePage: false,
    }
  },
  mounted() {
    if (this.$route.name === 'bands-bandProfile') {
      this.isProfilePage = true
    }
  },
}
</script>

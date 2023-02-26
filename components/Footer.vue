<template>
  <div
    class="w-full h-[80px] bg-black flex items-center justify-center"
    :class="{
      'h-[40px] fixed bottom-0': $route.name === 'bands-bandProfile',
      'h-[40px] fixed bottom-0': $route.name === 'weeklyvideo',
    }"
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
}
</script>

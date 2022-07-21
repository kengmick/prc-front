<template>
  <div
    v-if="$strapi.user"
    class="w-screen h-screen flex justify-center items-center bg-green-500"
  >
    <div class="bg-black text-white">Membership!!!</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>

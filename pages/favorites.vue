<template>
  <!-- the popup on the be a fantic buton is on the poster card  -->
  <div v-if="$strapi.user">
    <h1 class="text-center">Favorite Bands</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favBands: [],
      ids: null,
    }
  },
  async mounted() {
    const user = await this.$strapi.user
    console.log(user)
  },
}
</script>

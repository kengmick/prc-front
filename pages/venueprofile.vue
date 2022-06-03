<template>
  <div>
    <section v-if="venue && image" class="container mx-auto mt-6">
      <h1 class="main_red_text chedder text-center">{{ venue.name }}</h1>
      <div
        class="h-[500px] back"
        :style="`background-image: url(${image})`"
      ></div>
      <!-- description -->
      <div class="my-10">
        <p class="text-lg px-2 md:text-2xl">{{ venue.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      venue: {},
      image: '',
    }
  },
  async mounted() {
    try {
      const venue = await this.$strapi.findOne(
        'venues',
        this.$route.query.venue
      )
      this.venue = venue
      this.image = venue.venueImg.url
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style scoped>
.back {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
}
</style>

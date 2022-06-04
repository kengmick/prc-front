<template>
  <div>
    <section v-if="venue && image" class="container mx-auto mt-6">
      <div v-if="venue.logo" class="flex items-center mb-4">
        <img class="h-16 pr-6" :src="venue.logo.url" alt="" />
        <nuxt-img :src="venue.logo.url" sizes="sm:100vw md:50vw lg:400px" />
        <h1 class="main_red_text chedder">{{ venue.name }}</h1>
      </div>
      <div v-else>
        <h1 class="main_red_text chedder text-center">{{ venue.name }}</h1>
      </div>
      <div
        class="h-[500px] back"
        :style="`background-image: url(${image})`"
      ></div>
      <!-- description -->
      <h2 class="mt-4">Description</h2>
      <div v-if="venue.description.split('\n')" class="mt-6">
        <p
          v-for="(description, index) in venue.description.split('\n')"
          :key="description + index"
          class="mt-4 ext-lg px-2 md:text-2xl"
        >
          {{ description }}
        </p>
      </div>
      <p v-else class="text-lg px-2 md:text-2xl">{{ venue.description }}</p>
    </section>
    <section class="container mx-auto">
      <h2 class="my-6">Details</h2>
      <!-- date started , genre(if applicable ) location streetNumber zip streetName contact -->
      <h3 class="text-3xl mb-4">Location</h3>
      <p v-if="venue.streetNumber" class="text-xl">
        {{ venue.streetNumber }} {{ venue.streetName }}, {{ venue.city }},
        {{ venue.state }} {{ venue.zip }}
      </p>
      <div v-if="venue.genre" class="mt-4">
        <h3 class="text-3xl mb-4">Genre</h3>
        <p class="text-xl">
          {{ venue.genre }}
        </p>
      </div>
      <div v-if="venue.dateOpened" class="mt-4">
        <h3 class="text-3xl mb-4">Established</h3>
        <p class="text-xl">
          {{ venue.dateOpened }}
        </p>
      </div>
      <div v-if="venue.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Contact</h3>
        <p class="text-xl">
          {{ venue.contact }}
        </p>
      </div>
    </section>
    <!-- media Gallery -->
    <section></section>
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

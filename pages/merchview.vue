<template>
  <div>
    <h1 class="text-center">Merch view</h1>
    <section
      v-if="band"
      class="grid grid-cols-1 sm:grid-cols-1 container mx-auto gap-10"
    >
      <div v-for="(m, index) in band.merch" :key="index" class="shadow-sm">
        <div v-if="m.productImage">
          <img :src="m.productImage.url" alt="" />
        </div>
        <div class="p-4">
          <h3 v-if="m.productName">{{ m.productName }}</h3>
        </div>
        <div v-if="m.description" class="p-4">
          <div>
            <p class="underline">Description</p>
            <p>{{ m.description }}</p>
          </div>
        </div>
        <!-- <div class="p-4">
          <span class="border-2 border-black px-4 py-2">Edit</span>
        </div> -->
      </div>
    </section>
    <pre>{{ error }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      band: {},
      merch: '',
      error: '',
    }
  },
  async mounted() {
    try {
      const band = await this.$strapi.findOne('bands', this.$route.query.band)
      this.band = band
    } catch (error) {
      this.error = error
    }
  },
}
</script>

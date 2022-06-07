<template>
  <div>
    <h1 class="text-center">Releases view</h1>
    <section
      v-if="band && band.releases"
      class="grid grid-cols-1 sm:grid-cols-4 container mx-auto gap-10"
    >
      <div v-for="(r, index) in band.releases" :key="index" class="shadow-sm">
        <div v-if="r.image">
          <img :src="r.image.url" alt="" />
        </div>
        <div v-else>
          <img src="~/static/recs.jpg" alt="" />
        </div>
        <div class="p-4">
          <h3 v-if="r.title">{{ r.title }}</h3>
        </div>
        <div v-if="r.link" class="p-4">
          <div>
            <p class="underline">Link</p>
            <a :href="r.link">View Link</a>
          </div>
        </div>
        <div v-else>
          <div>
            <p class="underline">Link</p>
            <a :href="r.link">No Link</a>
          </div>
        </div>
        <div>
          <div>
            <NuxtLink
              class="underline"
              :to="{ path: 'bandprofile', query: { band: band.id } }"
              >View band
            </NuxtLink>
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
      const band = await this.$strapi.findOne('bands', this.$route.query.bandId)
      this.band = band
    } catch (error) {
      this.error = error
    }
  },
}
</script>

<template>
  <div v-if="$strapi.user">
    <section v-if="band">
      <section class="my-4">
        <h2 class="text-2xl text-center my-6">Pick a card to feature</h2>
        <SearchFeatured index="bands" />
      </section>
    </section>
    <section v-else>
      <section class="my-4">
        <h2 class="text-2xl text-center my-6">
          Add this card to one of your profiles
        </h2>
        <SearchFeatured index="bands" />
      </section>
    </section>
  </div>
  <div v-else>
    <h2>Please sign in</h2>
    <div class="bg-black text-white px-4 py-2 flex justify-center items-center">
      Sign in
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      band: null,
    }
  },
  async mounted() {
    try {
      if (this.$route.query.band) {
        const band = await this.$strapi.findOne('bands', this.$route.query.band)
        this.band = band
      }
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style scoped>
.ais-SearchBox-input {
  height: 50px;
  padding: 1em 3em 1em 1em;
}
.ais-SearchBox-submitIcon {
  height: 18px;
  width: 18px;
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: -3px;
}
</style>

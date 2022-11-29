<template>
  <div>
    <section
      v-if="bands"
      class="container mx-auto flex flex-col justify-center items-center sm:flex-row"
    >
      <PosterCard
        v-for="(band, index) in bands"
        :key="band.bandName + index"
        :band="band"
        :user="band.users_permissions_user"
        :isFeatured="true"
        :addThisCard="true"
        :addToYourCard="true"
        :cardToAdd="cardToAdd"
      />
    </section>
    <!-- <ais-instant-search :search-client="searchClient" :index-name="index">
      <section class="flex justify-center items-center">
        <ais-search-box id="a" />
      </section>
      <ais-hits>
        <template v-slot="{ items }">
          <div>
            <pre>{{ items[0] }}</pre>
          </div>
        </template>
      </ais-hits>
    </ais-instant-search> -->
  </div>
</template>

<script>
// import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
// import { AisInstantSearch, AisSearchBox, AisHits } from 'vue-instantsearch'
export default {
  // components: {
  //   AisInstantSearch,
  //   AisSearchBox,
  //   AisHits,
  // },
  props: {
    index: {
      type: String,
      default: () => {
        return 'bands'
      },
    },
    filter: {
      type: String,
      default: () => {
        return ''
      },
    },
    cardToAdd: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
  data() {
    return {
      bands: null,
      // searchClient: instantMeiliSearch(
      //   'https://prcsearch.net',
      //   'OTRmM2M3MGE3NGJlN2FlMGIxYWMwN2E2'
      // ),
    }
  },
  async mounted() {
    try {
      const allBands = await this.$strapi.find('bands')
      this.bands = allBands.filter((b) => {
        return b.users_permissions_user.id === this.$strapi.user.id
      })
    } catch (error) {}
  },
}
</script>

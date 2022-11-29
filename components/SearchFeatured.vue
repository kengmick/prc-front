<template>
  <div>
    <section
      v-if="bands"
      class="container mx-auto flex flex-col justify-center items-center sm:flex-row mb-16"
    >
      <PosterCard
        class="mb-20"
        v-for="(band, index) in bands"
        :key="band.bandName + index"
        :band="band"
        :user="band.users_permissions_user"
        :isFeatured="true"
        :addThisCard="true"
        :addToYourCard="true"
        :cardToAdd="cardToAdd"
        :selectUsersCard="true"
        :addingCard="true"
        :usersCard="usersCard"
        @selectUsersCard="log(band)"
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
    usersCard: {
      type: Boolean,
      default: () => {
        return false
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
      if (this.filter === 'yourBands') {
        this.bands = allBands.filter((b) => {
          return b.users_permissions_user.id === this.$strapi.user.id
        })
      } else {
        this.bands = allBands
      }
    } catch (error) {}
  },
  methods: {
    log(band) {
      console.log('from poster this is band ', band.id)
      this.$emit('selectUsersCard', band)
    },
  },
}
</script>

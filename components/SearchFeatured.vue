<template>
  <div>
    <section
      v-if="bands"
      class="container mx-auto flex flex-col justify-center items-center sm:flex-row mb-16"
    >
      <ais-instant-search :search-client="searchClient" :index-name="index">
        <section class="flex justify-center items-center">
          <ais-search-box class="my-6 search" />
        </section>
        <ais-hits>
          <template v-slot="{ items }" v-if="filter === 'yourBands'">
            <span v-for="(band, index) in items" :key="band.bandName + index">
              <PosterCard
                v-if="band.users_permissions_user.id === $strapi.user.id"
                class="mb-20"
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
            </span>
          </template>
          <template v-else v-slot="{ items }">
            <PosterCard
              v-for="(band, index) in items"
              class="mb-20"
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
          </template>
        </ais-hits>
      </ais-instant-search>
    </section>
  </div>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { AisInstantSearch, AisSearchBox, AisHits } from 'vue-instantsearch'
export default {
  components: {
    AisInstantSearch,
    AisSearchBox,
    AisHits,
  },
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
      searchClient: instantMeiliSearch(
        'https://prcsearch.net',
        'OTRmM2M3MGE3NGJlN2FlMGIxYWMwN2E2'
      ),
    }
  },
  async mounted() {
    try {
      const allBands = await this.$strapi.find('bands')
      if (this.filter === 'yourBands') {
        console.log('this is the filter ')
        const filt = allBands.filter((b) => {
          return b.users_permissions_user.id === this.$strapi.user.id
        })

        console.log(filt)
        this.bands = filt
      } else {
        console.log('this is all the bands  ')
        this.bands = allBands
      }
    } catch (error) {
      console.log(error, 'could not get bands')
    }
  },
  methods: {
    log(band) {
      if (toString(band.id).indexOf('-')) {
        console.log(band.id.indexOf('-'), 'this is the idx')
        const idx = band.id.indexOf('-')
        band.id = band.id.substring(idx + 1)
      }
      console.log('from poster this is band ', band.id)
      this.$emit('selectUsersCard', band)
    },
  },
}
</script>
<style scoped>
.ais-SearchBox-input {
  padding: 2em 1em;
}
</style>

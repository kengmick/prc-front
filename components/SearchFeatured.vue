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
          <template
            v-if="type === 'bands' && filter === 'yourBands'"
            v-slot="{ items }"
          >
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
          <div v-if="type === 'distros'">hello this is distr o</div>
          <template v-if="type === 'distro'">
            distros ...
            <CardsDistroCard
              v-for="distro in distros"
              :key="distro.name"
              :distro="distro"
              :selectUsersCard="true"
              :addingCard="true"
              :usersCard="usersCard"
              @selectUsersCard="featureData(distro)"
            />
          </template>
        </ais-hits>
      </ais-instant-search>
    </section>
    <section
      v-if="distros"
      class="container mx-auto flex flex-col justify-center items-center sm:flex-row mb-16"
    >
      fsdafadsfasdfsadfdsafadsfdasf
      <ais-instant-search
        :search-client="searchClient"
        :index-name="'record-labels'"
      >
        <section class="flex justify-center items-center">
          <ais-search-box class="my-6 search" />
        </section>
        <ais-hits>
          <template v-if="type === 'distro'">
            distro
            <CardsDistroCard
              v-for="distro in distros"
              :key="distro.name"
              :distro="distro"
              :selectUsersCard="true"
              :addingCard="true"
              :usersCard="usersCard"
              @selectUsersCard="featureData(distro)"
              class="my-6"
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
    type: {
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
      distros: null,
      searchClient: instantMeiliSearch(
        'https://prcsearch.net',
        'OTRmM2M3MGE3NGJlN2FlMGIxYWMwN2E2'
      ),
    }
  },
  async mounted() {
    try {
      if (this.type === 'bands') {
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
      }
      if (this.type === 'distros') {
        const allDistros = await this.$strapi.find('record-labels')
        if (this.filter === 'yourDistros') {
          console.log('this is the filter distor ')
          const filt = allDistros.filter((d) => {
            return d.users_permissions_user.id === this.$strapi.user.id
          })

          console.log(filt)
          this.distros = filt
        } else {
          console.log('this is all the bands  ')
          this.distros = allDistros
        }
      }
    } catch (error) {
      console.log(error, 'could not get bands')
    }
  },
  methods: {
    featureData(data) {
      console.log('log is logger', data)
      this.$emit('selectUsersCard', this.data.id)
      // if (toString(this.data.id).indexOf('-')) {
      //   console.log(this.data.id.indexOf('-'), 'this is the idx')
      //   const idx = this.data.id.indexOf('-')
      //   this.data.id = this.data.id.substring(idx + 1)
      // }

      // this.$emit('selectUsersCard', this.data.id)
    },
  },
}
</script>
<style scoped>
.ais-SearchBox-input {
  padding: 2em 1em;
}
</style>

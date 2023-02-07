<template>
  <div
    style="z-index: 9999999; overflow: scroll"
    class="h-screen w-screen fixed bg-white top-0"
  >
    <div class="pt-[20px] pr-[20px]" @click="toggleSearch">
      <nuxt-img
        src="close_black.svg"
        width="20"
        height="20"
        class="ml-auto mb-[20px]"
      />
    </div>
    <section class="px-4 mb-6">
      <div class="flex justify-between mt-4">
        <h2
          :class="{ isActive: bandActive }"
          class="text-xl"
          @click="changeIndex('bands')"
        >
          Bands
        </h2>
        <h2
          :class="{ isActive: distroActive }"
          class="text-xl"
          @click="changeIndex('record-labels')"
        >
          Distros
        </h2>
        <h2
          :class="{ isActive: showActive }"
          class="text-xl"
          @click="changeIndex('events')"
        >
          Showz
        </h2>
        <h2
          :class="{ isActive: venueActive }"
          class="text-xl"
          @click="changeIndex('venues')"
        >
          Venue
        </h2>
        <h2
          :class="{ isActive: tourActive }"
          class="text-xl"
          @click="changeIndex('tours')"
        >
          Tour
        </h2>
        <h2
          :class="{ isActive: classifiedActive }"
          class="text-xl"
          @click="changeIndex('classified')"
        >
          Classified
        </h2>
      </div>
    </section>
    <!-- <ais-instant-search :search-client="searchClient" :index-name="index">
      <ais-refinement-list attribute="city" />
      <section class="flex justify-center items-center w-auto">
        <ais-search-box
          class="relative"
          id="a"
          :classNames="{
            'ais-SearchBox': 'searchBox',
            'ais-SearchBox-input': 'searchFormCustom',
          }"
        >
          <template v-slot:submit-icon
            ><nuxt-img
              src="search.svg"
              width="20"
              height="20"
              class="absolute right-[20px] top-[3px]"
          /></template>
        </ais-search-box>
      </section>
      <ais-state-results>
        <template v-slot="{ state: { query } }">
          <ais-hits v-if="query.length >= 0">
            <template v-slot="{ items }">
              <ul class="container flex flex-col items-center mt-10">
                <li
                  v-for="item in items"
                  :key="item.objectID"
                  @click="toggleSearch"
                >
                  <section>
                    <NuxtLink
                      v-if="index === 'bands'"
                      :to="{
                        path: '/bands/bandprofile',
                        query: {
                          band: item.id.replace('bands-', ''),
                        },
                      }"
                      class="text-xl chedder z-20"
                      style="z-index: 9999"
                    >
                      <pre>{{ trimId(item) }}</pre>
                      <PosterCard
                        class="mb-10"
                        style="z-index: -9999"
                        :band="trimId(item)"
                        :user="item.users_permissions_user"
                        :isFeatured="true"
                        :isHome="true"
                        @startChat="startChatNow(band.users_permissions_user)"
                      />
                    </NuxtLink>
                  </section>

                  <NuxtLink
                    v-if="index === 'record-labels'"
                    :to="{
                      path: '/distros/distroview',
                      query: {
                        article: item.id.substring(item.id.indexOf('-') + 1),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsDistroCard :distro="item" />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'events'"
                    :to="{
                      path: '/events/eventview',
                      query: {
                        event: item.id.substring(item.id.indexOf('-') + 1),
                      },
                    }"
                    class="text-xl chedder z-20"
                    style="z-index: 9999"
                  >
                    <CardsShowCard
                      class="mb-10"
                      style="z-index: -9999"
                      :event="item"
                      :user="item.users_permissions_user"
                      :isFeatured="true"
                      :isHome="true"
                      @startChat="startChatNow(item.users_permissions_user)"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'venue'"
                    :to="{
                      path: '/events/eventview',
                      query: {
                        event: item.id.substring(item.id.indexOf('-') + 1),
                      },
                    }"
                    class="text-xl chedder z-20"
                    style="z-index: 9999"
                  >
                    <CardsVenueCard
                      class="mb-10"
                      style="z-index: -9999"
                      :venue="item"
                      @startChat="startChatNow(item.users_permissions_user)"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'classified'"
                    :to="{
                      path: '/classified/classifiedview',
                      query: {
                        article: item.id.substring(item.id.indexOf('-') + 1),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsClassifiedCard
                      style="z-index: -9999"
                      class="mx-auto"
                      :article="item"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'classifieds'"
                    :to="{
                      path: '/classified/classifiedview',
                      query: {
                        article: item.id.substring(item.id.indexOf('-') + 1),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsClassifiedCard
                      style="z-index: -9999"
                      class="mx-auto"
                      :article="item"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'tours'"
                    :to="{
                      path: '/tours',
                      query: {
                        article: item.id.substring(item.id.indexOf('-') + 1),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsTourCard :tour="item" :key="item.name" />
                  </NuxtLink>
                </li>
              </ul>
            </template>
          </ais-hits>
          <div class="hidden" v-else></div>
        </template>
      </ais-state-results>
    </ais-instant-search> -->
  </div>
</template>
<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import // AisInstantSearch,
// AisSearchBox,
// AisHits,
// AisStateResults,
// AisRefinementList,
'vue-instantsearch'
export default {
  components: {
    // AisRefinementList,
    // AisInstantSearch,
    // AisSearchBox,
    // AisHits,
    // AisStateResults,
  },

  data() {
    return {
      searchClient: instantMeiliSearch(
        // 'http://localhost:1337',
        'https://prcsearch.net',
        // 'https://punkrockcompound.com',
        'OTRmM2M3MGE3NGJlN2FlMGIxYWMwN2E2'
      ),
      index: 'bands',
      bandActive: true,
      distroActive: false,
      showActive: false,
      venueActive: false,
      tourActive: false,
      classifiedActive: false,
    }
  },
  methods: {
    trimId(meiliItem) {
      const [type, id] = meiliItem.id.split('-')
      return {
        ...meiliItem,
        id,
        type,
      }
    },
    log() {
      console.log('logs')
    },
    toggleSearch() {
      console.log('toggleSearch')
      this.$emit('toggleSearch')
      console.log('has emited')
    },
    changeIndex(selectedIndex) {
      const indexes = [
        'bands',
        'distros',
        'shows',
        'venue',
        'tours',
        'classified',
      ]
      for (let i = 0; i < indexes.length; i++) {
        if (selectedIndex === 'bands') {
          console.log('this is the index from the change index function')
          this.distroActive = false
          this.showActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.tourActive = false
          this.index = selectedIndex
          return (this.bandActive = true)
        }
        if (selectedIndex === 'record-labels') {
          console.log('record labels')
          this.bandActive = false
          this.showActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.tourActive = false
          this.index = 'record-labels'
          return (this.distroActive = true)
        }
        if (selectedIndex === 'events') {
          this.bandActive = false
          this.distroActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.tourActive = false
          this.index = selectedIndex
          return (this.showActive = true)
        }
        if (selectedIndex === 'tours') {
          this.bandActive = false
          this.distroActive = false
          this.showActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.index = selectedIndex
          return (this.tourActive = true)
        }
        if (selectedIndex === 'venues') {
          this.bandActive = false
          this.distroActive = false
          this.showActive = false
          this.toursActive = false
          this.classifiedActive = false
          this.index = 'venue'
          return (this.venueActive = true)
        }
        if (selectedIndex === 'classified') {
          this.bandActive = false
          this.tourActive = false
          this.distroActive = false
          this.showActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.index = selectedIndex
          return (this.classifiedActive = true)
        }
      }
      this.index = selectedIndex
    },
  },
}
</script>

<style scoped>
.searchBox {
  width: 90% !important;
  border: 1px solid black;
}

.ais-SearchBox-input {
  width: 300px !important;
  background: red;
  display: none;
}

input {
  display: none;
}
.isActive {
  color: red !important;
}
</style>

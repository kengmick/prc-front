<template>
  <div
    style="z-index: 9999999"
    class="h-screen w-screen absolute bg-white top-0"
  >
    <div class="pt-[20px] pr-[20px]" @click="toggleSearch">
      <nuxt-img
        src="close_black.svg"
        width="20"
        height="20"
        class="ml-auto mb-[20px]"
      />
    </div>
    <ais-instant-search :search-client="searchClient" :index-name="index">
      <section class="flex justify-center items-center w-auto">
        <ais-search-box
          class="relative"
          id="a"
          :class-names="{
            'ais-SearchBox': 'searchBox',
            'ais-SearchBox-submitIcon': 'searchFormCustom',
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
      <!-- <ais-state-results>
        <template v-slot="{ state: { query } }">
          <ais-hits v-if="query.length >= 0">
            <template v-slot="{ items }">
              <ul>
                <li v-for="item in items" :key="item.objectID">
                  <NuxtLink
                    v-if="index === 'bands'"
                    :to="{
                      path: '/bands/bandprofile',
                      query: {
                        band: item.id.substring(item.id.indexOf('-') + 1),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                    >{{ item.bandName }}</NuxtLink
                  >
                  <NuxtLink
                    v-if="index === 'classified'"
                    :to="{
                      path: '/classified/classifiedview',
                      query: {
                        article: item.id.substring(item.id.indexOf('-') + 1),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                    >{{ item.title }}
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'venues'"
                    :to="{
                      path: '/venues',
                      query: {
                        article: item.id.substring(item.id.indexOf('-') + 1),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                    >{{ item.name }}
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
                    >{{ item.title }}
                  </NuxtLink>
                </li>
              </ul>
            </template>
          </ais-hits>
          <div class="hidden" v-else></div>
        </template>
      </ais-state-results> -->
    </ais-instant-search>
  </div>
</template>
<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import {
  AisInstantSearch,
  AisSearchBox,
  // AisHits,
  // AisStateResults,
} from 'vue-instantsearch'
export default {
  components: {
    AisInstantSearch,
    AisSearchBox,
    // AisHits,
    // AisStateResults,
  },
  props: {
    index: {
      type: String,
      default: () => {
        return 'bands'
      },
    },
  },

  data() {
    return {
      searchClient: instantMeiliSearch(
        'https://prcsearch.net',
        // 'https://punkrockcompound.com',
        'OTRmM2M3MGE3NGJlN2FlMGIxYWMwN2E2'
      ),
    }
  },
  methods: {
    toggleSearch() {
      this.$emit('toggleSearch')
      console.log('has emited')
    },
  },
}
</script>

<style scoped>
.searchBox {
  width: 90% !important;
  border: 1px solid black;
}
.searchFormCustom {
  display: none !important;
  margin-left: 120px;
}
</style>

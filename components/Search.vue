<template>
  <div>
    <ais-instant-search :search-client="searchClient" :index-name="index">
      <section class="flex justify-center items-center">
        <ais-search-box id="a" />
      </section>
      <ais-state-results>
        <template v-slot="{ state: { query } }">
          <ais-hits v-if="query.length >= 0">
            <template v-slot="{ items }">
              <ul>
                <li v-for="item in items" :key="item.objectID">
                  <NuxtLink
                    v-if="index === 'bands'"
                    :to="{
                      path: '/bandprofile',
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
                      path: '/classifiedview',
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
      </ais-state-results>
    </ais-instant-search>
  </div>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisStateResults,
} from 'vue-instantsearch'
export default {
  components: {
    AisInstantSearch,
    AisSearchBox,
    AisHits,
    AisStateResults,
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
        'OTRmM2M3MGE3NGJlN2FlMGIxYWMwN2E2'
      ),
    }
  },
}
</script>

<style lang="scss" scoped></style>

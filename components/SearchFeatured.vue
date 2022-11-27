<template>
  <div>
    <ais-instant-search :search-client="searchClient" :index-name="index">
      Search box here
      <section class="flex justify-center items-center mb-6">
        <ais-search-box />
      </section>
      <ais-state-results>
        <template v-slot="{ state: { query } }">
          <ais-hits v-if="query.length >= 0 || query === null">
            <template v-slot="{ items }">
              <section
                class="container mx-auto flex gap-4 justify-center items-center mb-10"
              >
                <div v-for="item in items" :key="item.objectID">
                  <PosterCard :addingCard="true" class="mb-10" :band="item" />
                </div>
              </section>
            </template>
          </ais-hits>
          <div class="hidden" v-else>Not here</div>
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
    filter: {
      type: String,
      default: () => {
        return ''
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

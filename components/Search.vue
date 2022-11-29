<template>
  <div>
    <ais-instant-search :search-client="searchClient" :index-name="index">
      <section class="flex justify-center items-center">
        <ais-search-box id="a" />
      </section>
      <ais-hits>
        <!-- <template v-slot="{ items }">
          <div>
            <pre>{{ items[0] }}</pre>
          </div>
        </template> -->
      </ais-hits>
    </ais-instant-search>
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

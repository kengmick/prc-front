<template>
  <div>
    <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
      <ais-instant-search :search-client="searchClient" index-name="bands">
        <ais-search-box placeholder="Search a band" :autofocus="true" />
        <ais-hits>
          <template v-slot:item="{ item }">
            <h2>{{ item.name }}</h2>
          </template>
        </ais-hits>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite-min.css'

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
      searchClient: algoliasearch(
        'O7P41KSHS3',
        'e44faf2814832ff0f62e87e737da6963'
      ),
    }
  },
}
</script>

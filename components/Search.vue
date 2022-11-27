<template>
  <div>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/instantsearch.js/4.49.1/instantsearch.production.min.js"
      integrity="sha512-iqWW75H5CU2SdWx0GQ7OAm3UaLNzqR+3DtSKCJlukp0GxgWwO/R5JRFrQFpXZVllLkKp3OG7F96Oy3Zq7xyHuw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4"></script>
    <ais-instant-search :search-client="searchClient" index-name="bands">
      <section class="flex justify-center items-center">
        <ais-search-box id="a" />
      </section>
      <ais-state-results>
        <template v-slot="{ state: { query } }">
          <ais-hits v-if="query.length > 0">
            <template v-slot="{ items }">
              <ul>
                <li v-for="item in items" :key="item.objectID">
                  <!-- bands -->
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
                  <!-- classifies -->
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

                  <!-- vens -->
                  <!-- classifies -->
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

                  <!-- tours -->
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
    <div class="ais-InstantSearch">
      <div class="left-panel">
        <div id="clear-refinements"></div>

        <div class="right-panel">
          <div id="searchbox" class="ais-SearchBox"></div>
          <div id="hits"></div>
        </div>
      </div>
    </div>
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
        '7ecd59ebd2247b94837a4fe303be908afa398e9a2a9445d001bb113cbdf07af6'
      ),
    }
  },
  async mounted() {
    try {
      this.searchClient = await instantMeiliSearch(
        'https://prcsearch.net',
        '7ecd59ebd2247b94837a4fe303be908afa398e9a2a9445d001bb113cbdf07af6'
      )
      console.log(this.searchClient, 'the search client ')
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style lang="scss" scoped></style>

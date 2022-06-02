<template>
  <div>
    <h1 class="chedder main_red_text text-center mb-6">Classified Page</h1>
    <section
      v-if="classifieds"
      class="container mx-auto px-4 flex flex-col items-start"
    >
      <div v-for="(article, index) in classifieds" :key="index" class="my-6">
        <nuxtLink
          :to="{ path: 'classifiedview', query: { classified: article.id } }"
          class="chedder text-2xl underline underline-offset-2 text-blue-700 hover:text-red-700"
        >
          <span class="text-black pr-6">{{
            moment(String(article.created_at)).format('MMM Do YY')
          }}</span>
          {{ article.title }}
          <span class="text-black pl-6"
            >({{ article.city }}, {{ article.state }})</span
          >
          <span class="text-black pl-6 ptmono"
            >Category {{ article.category }}
          </span>
        </nuxtLink>
      </div>
    </section>
    <!-- <pre>{{ classifieds }}</pre> -->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      classifieds: [],
    }
  },
  async mounted() {
    const classifieds = await this.$strapi.find('classifieds')
    this.classifieds = classifieds.sort(function (a, b) {
      return moment(b.created_at).format('X') - moment(a.created_at).format('X')
    })
  },
  methods: {
    moment,
  },
}
</script>

<style scoped>
.btn_custom {
  padding: 0.5em 1em;
  border: 1px solid black;
  background: black;
  color: white;
  cursor: pointer;
}
</style>

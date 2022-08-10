<template>
  <div>
    <Title title="Classified" />
    <section
      v-if="classifieds"
      class="container mx-auto px-4 flex flex-col items-start"
    >
      <div
        v-for="(article, index) in classifieds"
        :key="index"
        class="my-6 flex flex-col sm:block sm:text-left"
      >
        <nuxtLink
          :to="{ path: 'classifiedview', query: { article: article.id } }"
          class="chedder text-2xl underline underline-offset-2 text-blue-700 hover:text-red-700"
        >
          <span class="block py-6 sm:inline sm:py-0 text-black pr-6">{{
            moment(String(article.created_at)).format('MMM Do YY')
          }}</span>
          {{ article.title }}
          <span class="block py-6 sm:inline sm:py-0 text-black pl-6"
            >({{ article.city }}, {{ article.state }})</span
          >
          <span class="hidden sm:inline text-black pl-6 ptmono"
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

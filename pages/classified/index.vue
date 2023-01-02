<template>
  <div>
    <Title title="Classified" />
    <section class="px-4">
      <Search index="classified" />
    </section>
    <section
      v-if="classifieds"
      class="mx-6 flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10"
    >
      <CardsClassifiedCard
        v-for="article in classifieds"
        :key="article.title"
        :article="article"
      />
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

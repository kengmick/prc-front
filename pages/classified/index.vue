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
        :isFav="favCheck('classifies', article.id)"
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
      favs: null,
    }
  },
  async mounted() {
    if (this.$strapi.user) {
      const f = await this.$strapi.find('favs', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.favs = f.sort((a, b) => {
        if (a.type < b.type) {
          return -1
        }
        if (a.type > b.type) {
          return 1
        }
        return 0
      })
    }

    const classifieds = await this.$strapi.find('classifieds')
    console.log(classifieds)

    this.classifieds = classifieds.sort(function (a, b) {
      return moment(b.created_at).format('X') - moment(a.created_at).format('X')
    })
  },
  methods: {
    moment,
    favCheck(type, id) {
      if (this.favs) {
        const check = this.favs.filter((f) => {
          console.log('fav checkc ')
          return f.data.id === id
        })
        if (check.length > 0) {
          return true
        }
        console.log(check, ' this is check ')
      } else {
        return false
      }
    },
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

<template>
  <div v-if="tours">
    <Title title="Tours" />
    <section class="px-4">
      <!-- <Search index="tours" /> -->
    </section>
    <section class="container mx-auto">
      <section
        class="mx-6 flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10"
      >
        <CardsTourCard
          v-for="tour in tours"
          :tour="tour"
          :key="tour.name"
          :isFav="favCheck('tours', tour.id)"
        />
      </section>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tours: '',
    }
  },
  async mounted() {
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
    const tours = await this.$strapi.find('tours')
    this.tours = tours
  },

  methods: {
    moment,
    favCheck(type, id) {
      const check = this.favs.filter((f) => {
        console.log('fav checkc ')
        return f.data.id === id
      })
      if (check.length > 0) {
        return true
      }
      console.log(check, ' this is check ')
    },
  },
}
</script>

<style lang="scss" scoped></style>

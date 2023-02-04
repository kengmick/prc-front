<template>
  <div class="container mx-auto">
    <h1 class="text-center text-3xl main_red_text mt-10">Distros/Labels</h1>
    <section class="px-4">
      <Search index="record-labels" />
    </section>
    <section
      v-if="distros"
      class="mx-6 flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10"
    >
      <CardsDistroCard
        v-for="distro in distros"
        :key="distro.name"
        :distro="distro"
        @updatedFavs="updatedFavs('record-labels', distro.id)"
        :isFav="favCheck('record-labels', distro.id)"
      />
    </section>
    <div v-else>{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distros: [],
      errorMessage: '',
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
    try {
      const distros = await this.$strapi.find('record-labels')
      this.distros = distros
    } catch (error) {
      this.errorMessage = 'Sorry ... there was a problem'
    }
  },
  methods: {
    async updatedFavs(type, id) {
      console.log(
        'this is the updated favs event emited from the parent component'
      )
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

        if (this.favs !== null) {
          const check = this.favs.filter((f) => {
            console.log('fav checkc ')
            return f.data.id === id
          })
          if (check.length > 0) {
            return true
          }
          console.log(check, ' this is check ')
        }
      }
    },
    favCheck(type, id) {
      console.log('emited from the child component')
      if (this.favs !== null) {
        const check = this.favs.filter((f) => {
          console.log('fav checkc ')
          return f.data.id === id
        })
        if (check.length > 0) {
          return true
        }
        console.log(check, ' this is check ')
      }
    },
  },
}
</script>

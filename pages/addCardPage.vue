<template>
  <div v-if="$strapi.user">
    <div>
      <!-- not users card  -->
      <section>
        <section class="my-4">
          <h2 class="text-2xl text-center my-6">Feature this card</h2>
          <div class="container-sm mx-auto flex justify-center items-center">
            <div v-if="cardData">
              <component
                v-bind:is="card"
                class="mb-10"
                :[type]="cardData"
                @selectUsersCard="featureData(cardData, dataType)"
              ></component>
            </div>
          </div>
          <p class="text-xl text-center my-6 chedder">
            Pick one of your profiles to add this card too
          </p>
          <!-- list all cards  -->
          <h3 class="text-main text-2xl text-center">Bands</h3>

          <div
            v-if="bands"
            class="container-sm mx-auto flex justify-center items-center mb-6"
          >
            <div v-for="b in bands" :key="b.id">
              <PosterCard
                class="mb-10"
                :band="b"
                :isFeatured="true"
                :isHome="true"
                :addingCard="true"
                :isAddCardPage="true"
                :disableAll="true"
                @selectUsersCard="featureData(cardData, 'bands', true, b.id)"
              />
            </div>
          </div>
          <div
            v-if="distros"
            class="container-sm mx-auto flex justify-center items-center mb-6"
          >
            <div v-for="d in distros" :key="d.name">
              <CardsDistroCard
                v-if="d"
                :distro="d"
                :addingCard="true"
                :isAddCardPage="true"
                @selectUsersCard="
                  featureData(cardData, 'record-labels', true, d.id)
                "
              />
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      band: null,
      distro: null,
      distros: null,
      articles: null,
      venues: null,
      tours: null,
      events: null,
      bands: null,
      profile: null,
      cardToBeAddedToo: null,
      type: null,
      data: null,
      userProfiles: null,
      tab: 'bands',
      card: null,
      cardData: null,
    }
  },
  computed: {
    cardType() {
      if (this.type === 'distros') {
        return 'distro'
      } else if (this.type === 'tours') {
        return 'tour'
      } else if (this.type === 'events') {
        return 'event'
      } else if (this.type === 'classifieds') {
        return 'classifieds'
      } else {
        return 'band'
      }
    },
  },
  async mounted() {
    this.type = this.$route.query.type
    this.data = this.$route.query.data
    try {
      const bands = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.bands = bands
      this.card = 'PosterCard'
    } catch (error) {
      console.log(
        error,
        'there and no bands that exist in the users whole wide world'
      )
    }

    try {
      this.distros = await this.$strapi.find('record-labels', {
        users_permissions_user: this.$strapi.user.id,
      })
      console.log(
        'this is all the users distros that it owns in the whole wide world',
        this.distros
      )
    } catch (error) {
      console.log(
        error,
        'there and no distros that exist in the users whole wide world'
      )
    }

    try {
      this.events = await this.$strapi.find('events', {
        users_permissions_user: this.$strapi.user.id,
      })
      console.log(
        'this is all the users events that it owns in the whole wide world',
        this.events
      )
    } catch (error) {
      console.log(
        error,
        'there and no events that exist in the users whole wide world'
      )
    }

    try {
      this.tours = await this.$strapi.find('tours', {
        users_permissions_user: this.$strapi.user.id,
      })
      console.log(
        'this is all the users tours that it owns in the whole wide world',
        this.tours
      )
    } catch (error) {
      console.log(
        error,
        'there and no tours that exist in the users whole wide world'
      )
    }

    try {
      this.venues = await this.$strapi.find('venues', {
        users_permissions_user: this.$strapi.user.id,
      })
      console.log(
        'this is all the users venues that it owns in the whole wide world',
        this.venues
      )
    } catch (error) {
      console.log(
        error,
        'there and no venues that exist in the users whole wide world'
      )
    }

    try {
      this.classifieds = await this.$strapi.find('classifieds', {
        users_permissions_user: this.$strapi.user.id,
      })
      console.log(
        'this is all the users classifieds that it owns in the whole wide world',
        this.classifieds
      )
    } catch (error) {
      console.log(
        error,
        'there and no classifieds that exist in the users whole wide world'
      )
    }

    // render card mounted hook
    try {
      if (this.type === 'band') {
        console.log('this is the band ')
        const band = await this.$strapi.findOne('bands', this.$route.query.data)
        this.band = band
        this.cardData = band
        this.card = 'PosterCard'
      }
      if (this.type === 'distro') {
        console.log('distros ==================')
        const distro = await this.$strapi.findOne(
          'record-labels',
          this.$route.query.data
        )
        this.cardData = distro
        this.card = 'CardsDistroCard'

        if (this.distro.users_permissions_user.id !== this.$strapi.user.id) {
          console.log('hello')
        }
        console.log(distro, ' this is final distro')
      }
      if (this.type === 'event') {
        console.log('event ==================')
        const event = await this.$strapi.findOne(
          'events',
          this.$route.query.data
        )
        this.cardData = event
        this.card = 'CardsShowCard'

        if (this.distro.users_permissions_user.id !== this.$strapi.user.id) {
          console.log('hello')
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async tabNav(val, comp) {
      this.tab = val
      this.currentTabComponent = comp
      console.log(val, ' this is the val ')
      const distros = await this.$strapi.find('record-labels')
      this.distros = distros
      console.log(distros, ' this is the last distro')
    },
    async featureData(data, dataType, featureBoolean, cardDataId) {
      // update the data
      console.log(dataType, data, 'this is type and data ', cardDataId)
      try {
        const updated = await this.$strapi.update(dataType, cardDataId, {
          hasFeaturedCard: true,
          cardType: this.type,
          cardData: data,
        })
        if (updated) {
          console.log(updated, 'this is the updated')
          this.$router.push({ path: '/profile' })
        }
      } catch (error) {
        console.log(
          error,
          ' there was an error in adding the card inside of another card'
        )
      }
    },

    async logCardPicked(card) {
      if (this.type === 'bands') {
        const updated = await this.$strapi.update(
          this.type,
          this.$route.query.data,
          {
            hasFeaturedCard: true,
            cardType: this.type,
            cardData: JSON.stringify(card),
          }
        )
        if (updated && this.type === 'bands') {
          this.$router.push({
            path: '/bands/bandprofile',
            query: { band: this.$route.query.data, disBack: true },
          })
        }
      }

      if (this.type === 'distro') {
        if (toString(this.distro.id).indexOf('-')) {
          console.log('to distro string ')
          const idx = this.distro.id.indexOf('-')
          this.distro.id = this.distro.id.substring(idx + 1)

          const updated = await this.$strapi.update(this.type, this.distro.id, {
            hasFeaturedCard: true,
            cardType: this.cardType,
            cardData: JSON.stringify(card),
          })
          if (updated) {
            this.$router.push({
              path: '/distros/distroview',
              query: { distro: this.distro.id },
            })
          }
        }
      }
    },
    async logUsersCard(card) {
      const cardData = await this.$strapi.findOne(
        this.type,
        this.$route.query.data
      )
      if (cardData) {
        const updated = await this.$strapi.update(this.type, card.id, {
          hasFeaturedCard: true,
          cardType: this.type,
          cardData: JSON.stringify(cardData),
        })
        if (updated) {
          this.$router.push({
            path: '/bands/bandprofile',
            query: { band: card.id },
          })
        }
      }
    },
  },
}
</script>

<style scoped>
.ais-SearchBox-input {
  height: 50px;
  padding: 1em 3em 1em 1em;
}
.ais-SearchBox-submitIcon {
  height: 18px;
  width: 18px;
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: -3px;
}
</style>

<template>
  <div v-if="$strapi.user">
    <div>
      <!-- not users card  -->
      <section>
        <section class="mb-4 mt-6">
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
          <!-- <section v-if="bands" class="my-10 overflow-x-auto">
            <div class="flex gap-4 w-min md:w-full md:justify-center">
              <div v-for="band in bands" :key="band.bandName">
                <SimpleCardsBand
                  class="w-[220px] mb-20"
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
          </section> -->

          <div
            v-if="bands"
            class="flex justify-start gap-4 overflow-x-scroll ml-2 my-[36px] lg:justify-center"
            :class="{ 'justify-center': bands.length <= 2 }"
          >
            <div class="w-min flex gap-4">
              <SimpleCardsBand
                v-for="b in bands"
                :key="b.id"
                class="w-[270px] mb-20"
                :band="b"
                :isFeatured="true"
                :isHome="true"
                :addingCard="true"
                :isAddCardPage="true"
                :disableAll="true"
                :disabled="true"
                @selectUsersCard="featureData(cardData, 'bands', true, b.id)"
              />
            </div>
          </div>

          <!-- <div v-if="distros" class="flex gap-6 overflow-x-scroll h-[500px]">
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
          </div> -->
          <!-- <div v-if="events" class="flex gap-6 overflow-x-scroll h-[500px]">
            <div v-for="e in events" :key="e.name">
              <CardsShowCard
                :event="e"
                :addingCard="true"
                @selectUsersCard="featureData(cardData, 'events', true, e.id)"
              />
            </div>
          </div> -->
          <!-- <div v-if="tours" class="flex gap-6 overflow-x-scroll h-[500px]">
            <div v-for="t in tours" :key="t.name">
              <CardsTourCard
                :tour="t"
                :addingCard="true"
                :isAddCardPage="true"
                @selectUsersCard="featureData(cardData, 'tours', true, t.id)"
              />
            </div>
          </div> -->
          <!-- <div v-if="venues" class="flex gap-6 overflow-x-scroll h-[500px]">
            <div v-for="v in venues" :key="v.name">
              <CardsVenueCard
                :addingCard="true"
                :venue="v"
                :isAddCardPage="true"
                @selectUsersCard="featureData(cardData, 'venues', true, v.id)"
              />
            </div>
          </div> -->
        </section>
      </section>
    </div>
    <section
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <Spinner />
    </section>
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
      loading: true,
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
      } else if (this.type === 'article') {
        return 'classified'
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
    // find your bands
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
      const events = await this.$strapi.find('events', {
        users_permissions_user: this.$strapi.user.id,
      })
      console.log(
        'this is all the users events that it owns in the whole wide world'
      )
      this.events = events
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
      const venues = await this.$strapi.find('venues', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.venues = venues
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
        this.loading = true
        console.log('this is the band ')
        const band = await this.$strapi.findOne('bands', this.$route.query.data)
        this.band = band
        this.cardData = band
        this.card = 'SimpleCardsBand'
        this.loading = false
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
      if (this.type === 'article') {
        console.log('article ==================')
        const article = await this.$strapi.findOne(
          'classifieds',
          this.$route.query.data
        )
        this.cardData = article
        this.card = 'CardsClassifiedCard'

        if (this.distro.users_permissions_user.id !== this.$strapi.user.id) {
          console.log('hello')
        }
      }
      if (this.type === 'venue') {
        console.log('venue ==================')
        const venue = await this.$strapi.findOne(
          'venues',
          this.$route.query.data
        )
        this.cardData = venue
        this.card = 'CardsVenueCard'
      }
      if (this.type === 'tour') {
        console.log('tour ==================')
        const tour = await this.$strapi.findOne('tours', this.$route.query.data)
        this.cardData = tour
        this.card = 'CardsTourCard'
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
      // get the band to update
      const userBand = await this.$strapi.findOne('bands', cardDataId)

      try {
        userBand.cardData.cards.push({
          type: dataType,
          bandName: data.bandName,
          city: data.city || null,
          state: data.state || null,
          country: data.country || null,
          bandProfileImg: data.bandProfileImg,
          id: data.id,
          dateStarted: data.dateStarted || null,
          cardDataId: cardDataId,
        })

        const updated = await this.$strapi.update(dataType, cardDataId, {
          cardData: userBand.cardData,
        })
        if (updated) {
          this.$router.push({
            path: '/bands/bandprofile',
            query: { band: cardDataId },
          })
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

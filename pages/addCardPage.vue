<template>
  <div v-if="$strapi.user">
    <div v-if="band">
      <!-- not users card  -->
      <section v-if="band.users_permissions_user.id !== $strapi.user.id">
        <section class="my-4">
          <!-- when not equal to the user id ... does not belong to user -->
          <h2 class="text-2xl text-center my-6">Feature this card</h2>
          <div class="container-sm mx-auto flex justify-center items-center">
            <PosterCard
              class="mb-10"
              :band="band"
              :user="band.users_permissions_user"
              :isFeatured="true"
              :isHome="true"
              :isAddCardPage="false"
              :disableAll="true"
              @startChat="startChatNow(band.users_permissions_user)"
            />
          </div>
          <p class="text-xl text-center my-6 chedder">
            Pick one of your profiles to add this card too
          </p>
          <!-- list all cards  -->

          <SearchFeatured
            index="bands"
            filter="yourBands"
            @selectUsersCard="logUsersCard"
          />
        </section>
      </section>
      <section v-if="band.users_permissions_user.id === $strapi.user.id">
        <section class="my-4">
          <h2 class="text-xl text-center my-6 chedder">
            Add Card to your band
          </h2>
          <div class="container-sm mx-auto flex justify-center items-center">
            <PosterCard
              class="mb-10"
              :band="band"
              :user="band.users_permissions_user"
              :isFeatured="true"
              :isHome="true"
              :isAddCardPage="false"
              @startChat="startChatNow(band.users_permissions_user)"
            />
          </div>
          <h2 class="text-xl text-center my-6 chedder">
            Pick a card to feature
          </h2>
          <SearchFeatured
            index="bands"
            filter="allBands"
            :usersCard="false"
            @selectUsersCard="logCardPicked"
          />
        </section>
      </section>
    </div>
    <div v-if="distro">
      <!-- not users card  -->
      <section v-if="distro.users_permissions_user.id !== $strapi.user.id">
        <section class="my-4">
          <!-- when not equal to the user id ... does not belong to user -->
          <h2 class="text-2xl text-center my-6">Feature this card</h2>
          <div class="container-sm mx-auto flex justify-center items-center">
            <CardsDistroCard
              class="mb-10"
              :distro="distro"
              :user="distro.users_permissions_user"
              :isFeatured="true"
              :isHome="true"
              :isAddCardPage="false"
              :disableAll="true"
              @startChat="startChatNow(distro.users_permissions_user)"
            />
          </div>
          <p class="text-xl text-center my-6 chedder">
            Pick one of your profiles to add this card too
          </p>
          <!-- list all cards  -->

          <SearchFeatured
            index="record-labels"
            filter="Distros/Labels"
            @selectUsersCard="logUsersCard"
          />
        </section>
      </section>
      <section v-if="distro.users_permissions_user.id === $strapi.user.id">
        <section class="my-4">
          <h2 class="text-xl text-center my-6 chedder">
            Add Card to your Distro
          </h2>
          <div class="container-sm mx-auto flex justify-center items-center">
            <CardsDistroCard
              class="mb-10"
              :distro="distro"
              :user="distro.users_permissions_user"
              :isFeatured="true"
              :isHome="true"
              :isAddCardPage="false"
              :disableAll="true"
              @startChat="startChatNow(distro.users_permissions_user)"
            />
          </div>
          <h2 class="text-xl text-center my-6 chedder">
            Pick a card to feature
          </h2>
          <SearchFeatured
            index="bands"
            filter="allBands"
            :usersCard="false"
            @selectUsersCard="logCardPicked"
          />
        </section>
      </section>
    </div>
  </div>
  <!-- <div v-else>
    <h2>Please sign in</h2>
    <div class="bg-black text-white px-4 py-2 flex justify-center items-center">
      Sign in
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      band: null,
      distro: null,
      cardToBeAddedToo: null,
      type: null,
      data: null,
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
      if (this.type === 'bands') {
        const band = await this.$strapi.findOne('bands', this.$route.query.data)
        this.band = band
        console.log(band)
        this.type = this.$route.query.type
        this.data = this.$route.query.data
      }
      if (this.type === 'distros') {
        const distro = await this.$strapi.findOne(
          'record-labels',
          this.$route.query.data
        )
        this.distro = distro
        console.log(distro, ' this is final distro')
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    addCard() {
      console.log('add a card to something')
    },
    async logCardPicked(card) {
      console.log(
        card,
        ' this is card then data ======= ',
        this.$route.query.data
      )
      console.log('updating ....', this.$route.query.data)
      const updated = await this.$strapi.update(
        this.type,
        this.$route.query.data,
        {
          hasFeaturedCard: true,
          cardType: this.type,
          cardData: JSON.stringify(card),
        }
      )
      if (updated) {
        this.$router.push({
          path: '/bands/bandprofile',
          query: { band: this.$route.query.data },
        })
      }

      if (this.type === 'distros') {
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
        'bands',
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

      // console.log(updated, 'this is updated ')
      // this.$router.push({
      //   path: '/bands/bandprofile',
      //   query: { band: card.id },
      // })
      // try {
      //   const updated = await this.$strapi.update(this.type, card.id, {
      //     hasFeaturedCard: true,
      //     cardType: this.type,
      //     cardData: JSON.stringify(this.card),
      //   })
      //   console.log(updated, ' this is updated ')
      //   if (updated) {
      //     if (this.type === 'distros') {
      //       this.$router.push({
      //         path: '/distros/distroview',
      //         query: { distro: card.id },
      //       })
      //     }
      //     this.$router.push({
      //       path: '/bands/bandprofile',
      //       query: { band: card.id },
      //     })
      //   }
      // } catch (error) {
      //   console.log(error, 'three was an error when trying to make the update')
      // }
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

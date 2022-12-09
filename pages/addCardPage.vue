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
      cardToBeAddedToo: null,
    }
  },
  async mounted() {
    try {
      if (this.$route.query.band) {
        const band = await this.$strapi.findOne('bands', this.$route.query.band)
        this.band = band
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
      console.log('loged card picked ')
      if (toString(this.band.id).indexOf('-')) {
        console.log('hello')
        const idx = this.band.id.indexOf('-')
        this.band.id = this.band.id.substring(idx + 1)
      }
      try {
        const updated = await this.$strapi.update('bands', this.band.id, {
          hasFeaturedCard: true,
          cardType: 'band',
          cardData: JSON.stringify(card),
        })
        if (updated) {
          this.$router.push({
            path: '/bands/bandprofile',
            query: { band: this.band.id },
          })
        }
      } catch (error) {
        console.log(error, 'three was an error when trying to make the update')
      }
    },
    async logUsersCard(card) {
      console.log(card.id, 'this is the final function ')
      try {
        const updated = await this.$strapi.update('bands', card.id, {
          hasFeaturedCard: true,
          cardType: 'band',
          cardData: JSON.stringify(this.band),
        })
        if (updated) {
          this.$router.push({
            path: '/bands/bandprofile',
            query: { band: card.id },
          })
        }
      } catch (error) {
        console.log(error, 'three was an error when trying to make the update')
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

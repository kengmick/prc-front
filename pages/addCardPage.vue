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
            type="bands"
            filter="yourBands"
            @selectUsersCard="logUsersCard"
          />
        </section>
      </section>
      <section v-if="band.users_permissions_user.id === $strapi.user.id">
        <section class="my-4">
          <h2 class="text-xl text-center my-6 chedder">
            Add Card to your <span>{{ 'band' }}</span>
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
          <h2 class="text-2xl text-center my-6">Feature this card distro</h2>
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
          <div v-if="userProfiles">{{ userProfiles }}</div>
          <!-- <SearchFeatured
            index="record-labels"
            type="distro"
            filter="yourDistros"
            @selectUsersCard="logUsersCard"
          /> -->
        </section>
      </section>

      <section v-if="distro.users_permissions_user.id === $strapi.user.id">
        <section class="my-4">
          <h2 class="text-xl text-center my-6 chedder">
            Add Card to your <span>distro</span>
          </h2>
          <div class="container-sm mx-auto flex justify-center items-center">
            <CardsDistroCard
              class="mb-10"
              :distro="distro"
              :user="distro.users_permissions_user"
              :isFeatured="true"
              :isHome="true"
              :isAddCardPage="false"
              @startChat="startChatNow(distro.users_permissions_user)"
            />
          </div>
          <h2 class="text-xl text-center my-6 chedder">
            Pick a card to feature
          </h2>
          <section v-if="!userProfiles">
            <div class="px-4 flex">
              <h3 class="pr-2" @click="tabNav('bands', 'PosterCard')">Bands</h3>
              <h3 class="pr-2" @click="tabNav('events', 'CardsShowCard')">
                Events
              </h3>
              <h3
                class="pr-2"
                @click="tabNav('record-labels', 'CardsDistroCard')"
              >
                Distros/Labels
              </h3>
            </div>
            <div>{{ tab }}</div>

            <div class="container-sm mx-auto flex justify-center items-center">
              <div v-if="tab === 'record-labels' && currentTabComponent">
                <div v-for="distro in distros" :key="distro.id">
                  <component
                    v-bind:is="currentTabComponent"
                    class="mb-10"
                    :distro="distro"
                    :isFeatured="true"
                    :isHome="true"
                    :isAddCardPage="false"
                    @startChat="startChatNow(distro.users_permissions_user)"
                    :disableAll="false"
                    :addingCard="true"
                    @selectUsersCard="featureData(distro)"
                  ></component>
                </div>
              </div>
            </div>
            <div class="container-sm mx-auto flex justify-center items-center">
              <div v-if="tab.type === 'bands' && currentTabComponent && bands">
                <div v-for="band in bands" :key="band.id">
                  <component
                    v-bind:is="currentTabComponent"
                    class="mb-10"
                    :user="band.users_permissions_user"
                    :isFeatured="true"
                    :isHome="true"
                    :addingCard="true"
                    @startChat="startChatNow(band.users_permissions_user)"
                  ></component>
                </div>
              </div>
            </div>
          </section>
          <!-- <SearchFeatured
            index="record-labels"
            type="distro"
            filter="allDistros"
            :usersCard="false"
            @selectUsersCard="logCardPicked"
          /> -->
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
      distros: null,
      bands: null,
      profile: null,
      cardToBeAddedToo: null,
      type: null,
      data: null,
      userProfiles: null,
      tab: 'bands',
      currentTabComponent: null,
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
      if (this.type === 'distro') {
        console.log('distros ==================')
        const distro = await this.$strapi.findOne(
          'record-labels',
          this.$route.query.data
        )
        this.distro = distro
        console.log(distro)
        if (this.distro.users_permissions_user.id !== this.$strapi.user.id) {
          console.log('hello')
        }
        console.log(distro, ' this is final distro')
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
    featureData(data) {
      console.log(data)
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

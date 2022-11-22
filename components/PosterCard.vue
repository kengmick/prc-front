<template>
  <div
    class="w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px]"
    :style="{ backgroundImage: `url(/punk-background.png)` }"
  >
    <!-- header -->
    <section
      class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
    >
      <h2 class="chedder text-[36px] text-white leading-none">Poster Band</h2>
    </section>
    <!-- info box  -->
    <section class="w-full flex justify-between px-[8px] [bg-blue-500 mb-[8px]">
      <div
        class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
      >
        <p class="text-[12px] chedder">Punk/Ska</p>
        <p class="text-[12px] chedder">Jan 1 2020</p>
      </div>
      <div
        class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
      >
        <p class="text-[12px] chedder">Chicago, IL</p>
        <p class="text-[12px] chedder">Internal Message</p>
      </div>
    </section>

    <!-- logo and card  -->
    <section class="w-full flex justify-between px-[4px] mb-[8px]">
      <div class="w-[141px] h-[186px] shadow-xl">
        <img class="h-full object-cover" src="punk-background.png" alt="" />
      </div>
      <!-- first featured Card  -->
      <div class="w-[141px] h-[186px] bg-[#27ED5E] shadow-xl">
        <div
          class="w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px] scaleDown"
          :style="{ backgroundImage: `url(/punk-background.png)` }"
        >
          <!-- header -->
          <section
            class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
          >
            <h2 class="chedder text-[36px] text-white leading-none">
              Poster Band
            </h2>
          </section>
          <!-- info box  -->
          <section
            class="w-full flex justify-between px-[8px] [bg-blue-500 mb-[8px]"
          >
            <div
              class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
            >
              <p class="text-[12px] chedder">Punk/Ska</p>
              <p class="text-[12px] chedder">Jan 1 2020</p>
            </div>
            <div
              class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
            >
              <p class="text-[12px] chedder">Chicago, IL</p>
              <p class="text-[12px] chedder">Internal Message</p>
            </div>
          </section>

          <!-- logo and card  -->
          <section class="w-full flex justify-between px-[4px] mb-[8px]">
            <div class="w-[141px] h-[186px] shadow-xl">
              <img
                class="h-full object-cover"
                src="punk-background.png"
                alt=""
              />
            </div>
            <!-- second featured Card  -->
            <div class="w-[141px] h-[186px] bg-[#27ED5E] shadow-xl">
              <div
                class="w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px] scaleDownThree"
                :style="{ backgroundImage: `url(/punk-background.png)` }"
              >
                <!-- header -->
                <section
                  class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
                >
                  <h2 class="chedder text-[36px] text-white leading-none">
                    Poster Band
                  </h2>
                </section>
                <!-- info box  -->
                <section
                  class="w-full flex justify-between px-[8px] [bg-blue-500 mb-[8px]"
                >
                  <div
                    class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
                  >
                    <p class="text-[12px] chedder">Punk/Ska</p>
                    <p class="text-[12px] chedder">Jan 1 2020</p>
                  </div>
                  <div
                    class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
                  >
                    <p class="text-[12px] chedder">Chicago, IL</p>
                    <p class="text-[12px] chedder">Internal Message</p>
                  </div>
                </section>

                <!-- logo and card  -->
                <section class="w-full flex justify-between px-[4px] mb-[8px]">
                  <div class="w-[141px] h-[186px] shadow-xl">
                    <img
                      class="h-full object-cover"
                      src="punk-background.png"
                      alt=""
                    />
                  </div>
                  <!-- first featured Card  -->
                  <div class="w-[141px] h-[186px] bg-[#27ED5E] shadow-xl"></div>
                </section>

                <!-- announcment box  -->
                <section
                  class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px]"
                >
                  <h2 class="text-[18px]">Title of Announcement</h2>
                  <p class="text-[12px]">This is the body of the text ...</p>
                </section>

                <!-- buttons  -->
                <section class="flex justify-around mt-[8px]">
                  <div
                    class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
                  >
                    Save
                  </div>
                  <div
                    class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
                  >
                    Copy
                  </div>
                  <div
                    class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
                  >
                    QR
                  </div>
                </section>
              </div>
            </div>
          </section>

          <!-- announcment box  -->
          <section
            class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px]"
          >
            <h2 class="text-[18px]">Title of Announcement</h2>
            <p class="text-[12px]">This is the body of the text ...</p>
          </section>

          <!-- buttons  -->
          <section class="flex justify-around mt-[8px]">
            <div
              class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
            >
              Save
            </div>
            <div
              class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
            >
              Copy
            </div>
            <div
              class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
            >
              QR
            </div>
          </section>
        </div>
      </div>
    </section>

    <!-- announcment box  -->
    <section
      class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px]"
    >
      <h2 class="text-[18px]">Title of Announcement</h2>
      <p class="text-[12px]">This is the body of the text ...</p>
    </section>

    <!-- buttons  -->
    <section class="flex justify-around mt-[8px]">
      <div
        class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
      >
        Save
      </div>
      <div
        class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
      >
        Copy
      </div>
      <div
        class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
      >
        QR
      </div>
    </section>
  </div>
</template>

<script>
// import Button from './Button.vue'
export default {
  // components: { Button },
  props: {
    band: {
      type: Object,
      default() {
        return {}
      },
    },
    user: {
      type: Object,
      default() {
        return {}
      },
    },

    isHome: {
      type: Boolean,
      default() {
        return false
      },
    },
  },

  data() {
    return {
      errorMessage: '',
      userFavs: [],
      updated: null,
      index: 0,
      chatComp: false,
    }
  },
  computed: {
    announcement() {
      return this.band.announcements[this.index] || ''
    },
    announcements() {
      return this.band.announcements || ''
    },
  },

  methods: {
    startChat(user) {
      console.log('user from the poster card ', user, ' the id ', user.id)
      this.$emit('startChat', user)
    },

    logit() {
      console.log('hey this is a double click')
    },
    async fav(bandId) {
      const stringId = bandId.toString()

      if (!this.$strapi.user) {
        alert('you must be logged in to favorite')
        console.log('the user is not logged in ')
        return this.$emit('popup', 'this event logged ....')
      } else {
        // get all user favorite stuff ... if they have any ... add a new favorite to it ... then resave all favoites to the user favs then route to favorite page the userFavs is an array so you can iterate over it using an array method wich is really an object at the end of the day or it wouldn't be about to have a method attached to it. Thank you for coming ... please come again soon.
        const user = await this.$strapi.user
        this.userFavs = await user.favs
        const json = { favObject: { type: 'band', id: stringId } }
        this.userFavs.push(json)
        //  favs: [...this.userFavs, { favObject: { ...json } }],
        console.log(this.userFavs)
        try {
          const f = await this.$strapi.update('users', this.$strapi.user.id, {
            favs: this.userFavs,
          })

          console.log(f)
        } catch (error) {
          this.errorMessage = 'error'
          console.log(error, 'this is the error message')
        }
      }

      this.$router.push({
        path: 'favorites',
        query: { user: this.$strapi.user.id, favs: this.updated },
      })
    },
    close() {
      this.errorMessage = ''
    },
    forward() {
      if (this.index !== this.announcements.length - 1) {
        this.index++
      }
    },
    back() {
      if (this.index !== 0) {
        this.index--
      }
    },
  },
}
</script>

<style scoped>
.card_header_size {
  font-size: 56px;
}
.error {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  z-index: 9999999999999;
  background: red;
}
.card_basic_info_text {
  font-size: 18px;
}

.modal {
  height: 100vh;
  width: 100vw;
  background: green;
}

.scaleDown {
  transform: scale(47.4%);
  margin-left: -79px;
  margin-top: -108px;
}

.scaleDownTwo {
  transform: scale(30%);
  margin-left: -105px;
  margin-top: -140px;
}
.scaleDownThree {
  transform: scale(47.4%);
  margin-left: -80px;
  margin-top: -105px;
}
</style>

<template>
  <div
    class="w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px]"
    :style="{ backgroundImage: `url(/punk-background.png)` }"
  >
    <!-- header -->
    <section
      class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
    >
      <h2 class="chedder text-[36px] text-white leading-none">Full Card</h2>
    </section>
    <!-- info box  -->
    <section class="w-full flex">
      <section class="w-[202px] h-[230px] flex flex-col">
        <!-- info box -->
        <div
          class="w-[116px] h-[102px] bg-[#27ED5E] ml-[4px] flex flex-col items-center justify-center"
        >
          <p class="chedder text-[16px]">Punk/Genre</p>
          <p class="chedder text-[16px]">Chicago, IL</p>
          <p class="chedder text-[16px]">Jan 1 2020</p>
          <p class="chedder text-[16px]">Internal Message</p>
        </div>
        <div class="w-[202px] h-[120px] mt-[8px] flex justify-around">
          <!-- logo -->
          <div class="w-[90px] h-[120px]">
            <img class="h-full object-cover" src="punk-background.png" alt="" />
          </div>
          <div class="w-[90px] h-[120px] bg-[#27ED5E]"></div>
        </div>
      </section>
      <section
        class="w-[94px] h-[230px] bg-[#27ED5E] mr-[4px] flex flex-col justify-center items-center"
      >
        <p class="chedder text-[16px]">Showz</p>
        <p class="chedder text-[16px]">Releases</p>
        <p class="chedder text-[16px]">Songs</p>
        <p class="chedder text-[16px]">Videos</p>
        <p class="chedder text-[16px]">Bio</p>
        <p class="chedder text-[16px]">Members</p>
        <p class="chedder text-[16px]">Links</p>
        <p class="chedder text-[16px]">Chat Rooms</p>
      </section>
    </section>
    <section
      class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px] mt-[8px]"
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
</style>

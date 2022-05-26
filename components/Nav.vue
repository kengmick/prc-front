<template>
  <section>
    <!-- top bar -->
    <div
      class="main_page_padding_left_right main_red_background grid_half top-bar-min-height"
    >
      <!-- mail icon with contact info -->
      <div class="flex_row flex_align_center">
        <div class="icon_margin_right mobile_display mail-icon-display">
          <img class="icon-height" src="~/static/mail-icon-white.svg" />
        </div>
        <div>
          <a
            class="link_no_style"
            href="mailto:contact@punkrockcompound.com?subject=Punk Rock Compound Header Link"
          >
            <p class="chedder main_white_text contact-text">
              contact@punkrockcompound.com
            </p>
          </a>
        </div>
      </div>
      <div class="flex_row flex_align_center flex_end_row">
        <!-- add the instagram icon please -->
        <a href="https://www.facebook.com/PunkRockCompoundChi">
          <img class="icon-height" src="~/static/facebook-white-icon.svg" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCi7RTyhkRtjTu_8Z_v-9UbQ/videos"
        >
          <img
            class="icon-height icon_margin_left"
            src="~/static/youtube-white-icon.svg"
          />
        </a>
      </div>
    </div>
    <!-- main bar -->
    <div class="main_page_padding_left_right grid_half main-bar-container">
      <!-- main logo -->
      <NuxtLink to="/">
        <img class="logo" src="~/static/logo-prc.svg" alt="" />
      </NuxtLink>
      <img class="menu" src="~/static/menu.svg" alt="" @click="toggleMenu" />
    </div>
    <section
      v-show="isOpen"
      class="z-20 flex flex-col justify-around items-center w-screen bg-red-500 fixed py-20 md:py-32 lg:py-40"
      :class="isOpen ? 'h-[calc(100vh-192px)] ' : 'h-0'"
    >
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/">Home</NuxtLink>
      </div>
      <div v-if="$strapi.user" @click="toggleMenu">
        <NuxtLink
          v-if="$strapi.user.band !== null"
          class="text-2xl chedder"
          to="/bandadmin"
          >Band Admin</NuxtLink
        >
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/videos">Videos</NuxtLink>
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/events" @click="toggleMenu"
          >Events</NuxtLink
        >
      </div>
      <div v-if="$strapi.user">
        <div @click="toggleMenu">
          <NuxtLink class="chedder text-2xl" to="/logout" @click="toggleMenu"
            >Logout</NuxtLink
          >
        </div>
      </div>
      <div v-if="!$strapi.uer" @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/signup" @click="toggleMenu"
          >signup</NuxtLink
        >
      </div>
      <div v-if="!$strapi.uer" @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/loginuser" @click="toggleMenu"
          >Sign In</NuxtLink
        >
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
      const bodyElement = document.querySelectorAll('body')[0]
      if (this.isOpen) {
        bodyElement.style = 'overflow:hidden;'
      } else {
        bodyElement.style = ''
      }
    },
  },
}
</script>
<style scoped>
/* stylelint-disable */
.top-bar-min-height {
  min-height: 56px;
}
.icon-height {
  height: 20px;
  width: 20px;
}
.logo {
  height: 82px;
}
.contact-text {
  font-size: inherit;
}
.main-bar-container {
  height: 136px;
  align-items: center;
}
.menu {
  justify-self: self-end;
}
@media (max-width: 360px) {
  .contact-text {
    font-size: 12px;
  }
  .icon-height {
    height: 12px;
    width: 12px;
  }
}
@media (max-width: 580px) {
  .mail-icon-display {
    display: none;
  }
  .main-bar-container {
    grid-template-columns: 2fr 1fr;
  }
}
</style>

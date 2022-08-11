<template>
  <section>
    <!-- top bar -->
    <div
      id="deskNav"
      class="block main_page_padding_left_right bg-black grid_half top-bar-min-height"
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
    <!-- desktop nav -->
    <div class="hidden md:flex px-10 py-2 main_red_background text-white">
      <div>
        <NuxtLink to="/">
          <img class="logo" src="~/static/logo-prc.svg" alt="" />
        </NuxtLink>
        <div class="flex justify-between">
          <div v-if="!$strapi.user">
            <NuxtLink class="chedder text-2xl" to="/signup">signup</NuxtLink>
          </div>
          <div v-if="!$strapi.user">
            <NuxtLink class="chedder text-2xl" to="/loginuser"
              >Sign In</NuxtLink
            >
          </div>
        </div>
      </div>
      <!-- singin signup -->
      <div class="flex justify-around place-items-center w-full">
        <div>
          <NuxtLink class="chedder text-2xl" to="/bands">Bands</NuxtLink>
        </div>
        <div>
          <NuxtLink class="chedder text-2xl" to="/events">Showz</NuxtLink>
        </div>
        <div>
          <NuxtLink class="chedder text-2xl" to="/venues">Venues</NuxtLink>
        </div>
        <!-- distro label -->
        <!-- <div>
          <NuxtLink class="chedder text-2xl" to="/distros"
            >Distro/Labels</NuxtLink
          >
        </div> -->

        <div>
          <NuxtLink class="chedder text-2xl" to="/tours">Tours</NuxtLink>
        </div>
        <div>
          <NuxtLink class="chedder text-2xl" to="/podcast">Podcast</NuxtLink>
        </div>
        <div>
          <NuxtLink class="chedder text-2xl" to="/Classifieds"
            >Classifieds</NuxtLink
          >
        </div>
        <div>
          <NuxtLink class="chedder text-2xl" to="/contact">Contact</NuxtLink>
        </div>
        <!-- <div>
          <NuxtLink class="chedder text-2xl" to="/Merch">Merch</NuxtLink>
        </div> -->

        <div v-if="$strapi.user">
          <div>
            <NuxtLink class="chedder text-2xl" to="/profile">profile</NuxtLink>
          </div>
        </div>
        <div v-if="$strapi.user">
          <div @click="logout">
            <NuxtLink class="chedder text-2xl" to="/">Logout</NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <!-- mobile nav -->
    <div class="flex md:hidden px-4 main-bar-container">
      <!-- main logo -->

      <div class="w-full">
        <NuxtLink to="/">
          <img
            class="logo"
            src="~/static/logo-prc.svg"
            alt=""
            @click="mobileTopNav"
          />
        </NuxtLink>
      </div>
      <!-- mobile menu icon  -->
      <div class="flex flex-grow w-full justify-end">
        <img
          :class="{ open: isOpen, scroll: hasScrolled }"
          class="menu fixed z-50 transition-all duration-200 ease-linear top-[110px] h-[30px] w-[30px]"
          :src="`/${menuIcon}`"
          alt=""
          @click="toggleMenu"
        />
      </div>
      <!-- <div class="flex justify-between">
        <div v-if="!$strapi.user" @click="toggleMenu">
          <NuxtLink class="chedder text-2xl" to="/signup">signup</NuxtLink>
        </div>
        <div v-if="!$strapi.user" @click="mobileTopNav">
          <NuxtLink class="chedder text-2xl" to="/loginuser">Sign In</NuxtLink>
        </div>
      </div> -->
    </div>
    <!-- 136 plus 56  192 -->
    <section
      class="z-20 h-[100vh] text-white flex flex-col justify-around items-center w-screen bg-red-500 fixed top-0 py-20 md:py-32 lg:py-40 transition-all ease-in-out duration-200 translate-x-full"
      :class="isOpen ? 'translate-x-0' : ' opacity-0'"
    >
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/">Home</NuxtLink>
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/bands">Bands</NuxtLink>
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/events">Showz</NuxtLink>
      </div>

      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/venues">Venues</NuxtLink>
      </div>
      <!-- <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/distros"
          >Distros/Labels</NuxtLink
        >
      </div> -->

      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/tours">Tours</NuxtLink>
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/classifieds"
          >Classifieds</NuxtLink
        >
      </div>
      <!-- <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/merch">Merch</NuxtLink>
      </div> -->
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/podcast">Podcast</NuxtLink>
      </div>
      <div v-if="$strapi.user" @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/profile">profile</NuxtLink>
      </div>

      <div v-if="$strapi.user" @click="logoutMobile">
        <NuxtLink class="chedder text-2xl" to="/">Logout</NuxtLink>
      </div>
      <div v-if="!$strapi.user" @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/signup">signup</NuxtLink>
      </div>
      <div v-if="!$strapi.user" @click="toggleMenu">
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
      menuIcon: 'menu.svg',
      hasScrolled: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      // if (window.scrollY >= 80) {
      //   const ele = document.getElementById('deskNav')
      //   return (ele.style.top = 0)
      // }
      // Your scroll handling here
      if (window.scrollY >= 56) {
        this.hasScrolled = true
      }
      if (window.scrollY <= 36) {
        this.hasScrolled = false
      }
    },
    mobileTopNav() {
      if (this.isOpen) {
        this.isOpen = false
        this.menuIcon = 'menu.svg'
      }
    },
    toggleMenu() {
      this.isOpen = !this.isOpen
      const bodyElement = document.querySelectorAll('body')[0]
      if (this.isOpen) {
        bodyElement.style = 'overflow:hidden;'
        this.menuIcon = 'close.svg'
      } else {
        bodyElement.style = ''
        this.menuIcon = 'menu.svg'
      }
    },
    logoutMobile() {
      this.isOpen = !this.isOpen
      const bodyElement = document.querySelectorAll('body')[0]
      this.$strapi.logout()
      if (this.isOpen) {
        bodyElement.style = 'overflow:hidden;'
      } else {
        bodyElement.style = ''
      }
    },
    logout() {
      this.$strapi.logout()
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
.open {
  top: 36px;
}
.scroll {
  top: 25px;
}
.close {
  top: 136px;
}
.sticky {
  position: fixed;
  top: 55.99;
  width: 100%;
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

<template>
  <section class="mb-[60px]">
    <SearchAlt
      :class="[isSearchOpen ? 'block' : 'hidden']"
      @toggleSearch="toggleSearch"
    />
    <!-- top bar -->
    <!-- <div
      id="deskNav"
      class="block main_page_padding_left_right bg-black grid_half top-bar-min-height"
    >
      <div class="flex_row flex_align_center">
        <div class="icon_margin_right mobile_display mail-icon-display">
          <nuxt-img src="/mail-icon-white.svg" width="12" height="12" />
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
    </div> -->

    <div class="hidden md:flex px-10 py-2 main_red_background text-white">
      <div>
        <NuxtLink to="/">
          <nuxt-img
            format="webp"
            class="logo"
            src="/logo-prc.svg"
            alt=""
            width="180"
            height="72"
          />
        </NuxtLink>
        <div class="flex justify-between">
          <div v-if="!$strapi.user">
            <NuxtLink class="chedder text-xl lt_space" to="/signup"
              >signup</NuxtLink
            >
          </div>
          <div v-if="!$strapi.user">
            <NuxtLink class="chedder text-xl" to="/loginuser">Sign In</NuxtLink>
          </div>
          <div v-if="$strapi.user">
            <div>
              <NuxtLink class="chedder text-xl lt_space" to="/profile"
                >User Page</NuxtLink
              >
            </div>
          </div>
          <div v-if="$strapi.user">
            <div @click="logout">
              <p class="chedder text-xl lt_space">Logout</p>
            </div>
          </div>
        </div>
      </div>
      <!-- singin signup -->
      <div class="flex justify-around place-items-center w-full">
        <div>
          <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/bands"
            >Bands</NuxtLink
          >
        </div>
        <div>
          <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/events"
            >Showz</NuxtLink
          >
        </div>
        <div>
          <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/venues"
            >Venues</NuxtLink
          >
        </div>
        <!-- distro label -->
        <div>
          <NuxtLink
            class="chedder text-2xl lt_space nav_font_size"
            to="/distros"
            >Labels/Distros</NuxtLink
          >
        </div>

        <div>
          <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/tours"
            >Tours</NuxtLink
          >
        </div>
        <!-- <div>
          <NuxtLink class="chedder text-2xl" to="/podcast">Podcast</NuxtLink>
        </div> -->
        <div>
          <NuxtLink
            class="chedder text-2xl lt_space nav_font_size"
            to="/classified/"
            >Classifieds</NuxtLink
          >
        </div>
        <div>
          <NuxtLink
            class="chedder text-2xl lt_space nav_font_size"
            to="/podcast"
            >Podcasts</NuxtLink
          >
        </div>
        <!-- <div>
          <NuxtLink class="chedder text-2xl" to="/Merch">Merch</NuxtLink>
        </div> -->
        <!-- <div>
          <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/videos"
            >Videos</NuxtLink
          >
        </div> -->

        <div v-if="$strapi.user">
          <!-- <div @click="logout">
            <NuxtLink class="chedder text-2xl" to="/">Logout</NuxtLink>
          </div> -->
        </div>
      </div>
    </div>
    <!-- mobile nav -->
    <div
      class="flex items-center px-4 fixed z-50 top-[0] w-screen py-[10px] bg-gray-900 md:hidden"
    >
      <!-- main logo -->

      <div class="w-full flex-grow">
        <NuxtLink to="/">
          <p class="chedder text-xl text-white">punkrockcompound</p>
          <!-- <nuxt-img
            class="logo"
            src="logo-prc.svg"
            alt=""
            @click="mobileTopNav"
            width="100"
          /> -->
        </NuxtLink>
      </div>
      <!-- mobile menu icon  -->
      <div class="flex gap-4 w-[20vw]">
        <div>
          <nuxt-img
            :class="{ 'opacity-0': isOpen }"
            class="menu transition-all duration-200 ease-linear"
            :src="`/whitesearch.svg`"
            alt="search icon"
            width="25"
            height="25"
            @click="toggleSearch"
          />
        </div>
        <div>
          <nuxt-img
            :class="{ open: isOpen }"
            class="menu transition-all duration-200 ease-linear"
            src="/whitemenu.svg"
            alt="menu icon"
            width="25"
            height="25"
            @click="toggleMenu"
          />
        </div>
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
        <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/"
          >Home</NuxtLink
        >
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/bands"
          >Bands</NuxtLink
        >
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/distros"
          >Distros/Labels</NuxtLink
        >
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/events"
          >Showz</NuxtLink
        >
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/venues"
          >Venues</NuxtLink
        >
      </div>
      <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/tours"
          >Tours</NuxtLink
        >
      </div>

      <div @click="toggleMenu">
        <NuxtLink
          class="chedder text-2xl lt_space nav_font_size"
          to="/classified"
          >Classifieds</NuxtLink
        >
      </div>
      <!-- <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/merch">Merch</NuxtLink>
      </div> -->
      <!-- <div @click="toggleMenu">
        <NuxtLink class="chedder text-2xl" to="/podcast">Podcast</NuxtLink>
      </div> -->
      <div v-if="$strapi.user" @click="toggleMenu">
        <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/profile"
          >User Page</NuxtLink
        >
      </div>

      <div v-if="$strapi.user" @click="logoutMobile">
        <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/"
          >Logout</NuxtLink
        >
      </div>
      <div v-if="!$strapi.user" @click="toggleMenu">
        <NuxtLink class="chedder text-2xl lt_space nav_font_size" to="/signup"
          >Signup</NuxtLink
        >
      </div>
      <div v-if="!$strapi.user" @click="toggleMenu">
        <NuxtLink
          class="chedder text-2xl lt_space nav_font_size"
          to="/loginuser"
          @click="toggleMenu"
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
      isSearchOpen: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen
    },
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
      if (this.isOpen) {
        bodyElement.style = 'overflow:hidden;'
        this.menuIcon = 'close.svg'
      } else {
        bodyElement.style = ''
        this.menuIcon = 'menu.svg'
      }
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
  height: 50px;
}
.contact-text {
  font-size: inherit;
}
.main-bar-container {
  height: 60px;
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

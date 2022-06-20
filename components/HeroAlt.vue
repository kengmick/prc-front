<template>
  <div class="hidden xl:block">
    <div
      class="h-[80vh] sm:h-[86vh] w-screen bg-black flex justify-center items-center"
    >
      <div class="container__image" :class="{ an: ani }">
        <NuxtLink to="livestream"
          ><div
            class="absolute top-[63%] left-[40%] arrow-right transition-all ease-linear duration-800"
            :class="{ 'opacity-0': !show }"
          ></div
        ></NuxtLink>
        <div class="container__info container__author"></div>
        <div class="container__info container__location">
          <h1 class="text-white chedder">24/7 Live Stream</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      message: '',
      hasLiveStream: false,
      hasFeatVideo: false,
      liveId: null,
      videoId: null,
      ani: false,
      show: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.ani = true
      this.show = true
    }, 11)
  },

  methods: {
    logout() {
      this.$strapi.logout()
    },
  },
}
</script>

<style scoped>
/* stylelint-disable */
.arrow-right {
  border-top: 120px solid transparent;
  border-bottom: 120px solid transparent;
  border-left: 220px solid #c11a08c7;
}
* {
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  background-color: #f4f6f8;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.container__image {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-image: url('~/static/live_background.png');
  background-size: cover;
  transition: ease-in-out 0.3s;
  z-index: 2;
}
.container__image:before {
  content: ' ';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background: inherit;
  background-position: bottom;
  filter: blur(10px) saturate(11%);
  transform: scaleX(0.4);
  transition: ease-in-out 0.4s;
  border-radius: 120px;
  transform-origin: right;
  opacity: 0;
  z-index: -1;
}
.container__image .container__info {
  position: relative;
  line-height: 1.8;
  transition: ease-in-out 0.3s;
  opacity: 0;
}
.container__image .container__location {
  transition-delay: 0.15s;
}

.an {
  border-radius: 0;
  width: 600px;
  height: 600px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(9, 55, 53, 0.08),
    0px 16px 24px rgba(9, 55, 53, 0.1), 0px 24px 32px rgba(9, 55, 53, 0.14);
}

.an:before {
  width: 100%;
  opacity: 0.18;
  filter: blur(10px) saturate(100%);
  transform: scale(2.8) translate3d(-18%, 0px, 0px);
}

.an .container__info {
  transform: translate3d(-40%, 0px, 0px);
  opacity: 1;
}

.container__image.an {
  border-radius: 0;
  width: 750px;
  height: 510px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(9, 55, 53, 0.08),
    0px 16px 24px rgba(9, 55, 53, 0.1), 0px 24px 32px rgba(9, 55, 53, 0.14);
}
.container__image.an:before {
  width: 100%;
  opacity: 0.18;
  filter: blur(10px) saturate(11%);
  transform: scale(2.8) translate3d(-18%, 0px, 0px);
}
.container__image.an:before {
  width: 100%;
  opacity: 0.18;
  filter: blur(10px) saturate(0%);
  transform: scale(2.8) translate3d(-18%, 0px, 0px);
}
.container__image.an .container__info {
  transform: translate3d(-40%, 0px, 0px);
  opacity: 1;
}

.an {
  color: red;
}

.link {
  border-bottom: 1px solid transparent;
  color: #06c0a8;
  text-decoration: none;
  transition: ease-in 0.13s;
}
.link:hover {
  background-color: #06c0a8;
  color: #ffffff;
}
</style>

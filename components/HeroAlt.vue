<template>
  <div>
    <section class="bg-black flex justify-center items-center">
      <iframe
        id="yt-video-iframe"
        class="video"
        width="300"
        height="500"
        :src="`https://www.youtube.com/embed/jqsFw354asc`"
        title="Punk Rock Compound July 31st"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </section>
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
      video: 'jqsFw354asc',
    }
  },
  async mounted() {
    try {
      const link = await this.$strapi.find('live-stream')
      this.video = link.streamLink
      console.log(this.video, 'video')
    } catch (error) {
      console.log(error)
    }
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
  transform: translate3d(-44%, 0px, 0px);
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
  transform: scale(1.5) translate3d(-18%, 0px, 0px);
}
.container__image.an:before {
  width: 100%;
  opacity: 0.18;
  filter: blur(10px) saturate(0%);
  transform: scale(1.5) translate3d(-18%, 0px, 0px);
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

/* video css  */

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
}
</style>

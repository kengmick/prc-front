<template>
  <div>
    <NuxtLink
      :to="{
        path: '/livestream',
        query: {
          liveId: liveId,
        },
      }"
    >
      <div>
        <div>
          <Nuxt-img
            src="live_background.png"
            sizes="sm:100vw md:50vw lg:400px"
          />
          <div class="h-12 w-full bg-black">
            <div class="play-btn-home flex items-center h-full px-4">
              <h3 class="text-white flex-grow">24/7 Live Stream</h3>
              <img class="play" src="~/static/play.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
    <!-- <NuxtLink to="/livestream">
      <div>
        <img src="~/static/live_background.png" alt="" />
        <div class="live-image-bottom-bar flex items-center pr-4">
          <p class="chedder text-white pl-5 bottom-bar-text">
            24/7 Video Stream
          </p>
          <div class="share">
            <img class="share_btn" src="~/static/share.svg" alt="" />
          </div>
          <div class="play-btn-home">
            <img class="play" src="~/static/play.svg" alt="" />
          </div>
        </div>
      </div>
    </NuxtLink> -->
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
    }
  },
  async mounted() {
    const data = await this.$strapi.find('singleVideo')
    this.liveId = data.id
    //   const { title, message, hasLiveStream, hasFeatVideo, liveId, videoId } =
    //     data
    //   this.title = title
    //   this.message = message
    //   this.liveId = liveId
    //   this.videoId = videoId
    //   this.hasLiveStream = hasLiveStream
    //   this.hasFeatVideo = hasFeatVideo
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
.btn-home {
  padding: 1em;
  background: black;
  color: white;
  width: 40%;
}
.bottom-bar-text {
  font-size: 28px;
}
.share {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
}
.play-btn-home {
  margin-left: 1.3em;
}
.live-placeholder-container {
  position: relative;
  width: auto;
}
.live-image-bottom-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 662px;
  background: black;
  min-height: 20%;
}
.image-height {
  min-height: 400px;
}
.main-container {
  margin-bottom: 2em;
  padding-left: 1em;
  padding-right: 1em;
}
.message-container {
  padding-left: 2em;
}
@media (max-width: 740px) {
  .bottom-bar-text {
    font-size: 18px;
  }
  .play {
    height: 20px;
  }
  .share_btn {
    height: 20px;
  }
}
@media (max-width: 740px) {
  .main-container {
    display: flex;
    flex-direction: column;
  }
  .title {
    text-align: center;
    margin-top: 2em;
  }
  .message {
    margin-bottom: 2em;
  }
  .message-container {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
}
@media (max-width: 1055px) {
  .title {
    font-size: 28px;
  }
}
@media (min-width: 1430px) {
  .live-image-bottom-bar {
    min-width: 100%;
  }
  .image-height {
    width: 100%;
  }
}
@media (min-width: 1740px) {
  .main-container {
    padding-left: 20vw;
    padding-right: 20vw;
  }
  .live-image-bottom-bar {
    min-width: 100%;
  }
  .image-height {
    width: 100%;
  }
}
@media (min-width: 1340px) {
  .message {
    font-size: 22px;
  }
}
@media (max-width: 300px) {
  .message {
    font-size: 22px;
  }
  .main-container {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

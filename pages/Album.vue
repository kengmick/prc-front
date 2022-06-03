<template>
  <div class="w-full lg:w-4/5 lg:mt-20 mx-auto">
    <!-- top player container  -->
    <div class="flex flex-col lg:flex-row 2xl:w-2/3 mx-auto">
      <div>
        <img
          v-if="album.albumCover"
          class="shaddow-md w-full lg:w-auto"
          :src="album.albumCover.formats.small.url"
          alt=""
        />
        <div class="h-28 w-full bg-black flex items-center justify-center">
          <h2 class="text-white text-3xl sm:text-4xl">
            {{ album.title }}
          </h2>
        </div>
      </div>
      <div class="flex flex-col flex-grow">
        <!-- <div
          v-if="!song.songFile"
          class="flex-grow h-full px-10 py-10 lg:px-24"
        >
          <h2 class="main_red_text pt-4 pb-2 text-2xl">Now Playing</h2>
          <div class="lg:px-0">
            <h2 class="text-3xl sm:text-4xl">{{ song.songTitle }}</h2>
            <p class="font-semibold text-xl pt-2">
              By
              <NuxtLink
                class="text-4xl main_red_text"
                :to="'/bandprofile/' + bandBand.id"
                ><em>{{ band.bandName }}</em></NuxtLink
              >
            </p>
          </div>
        </div> -->
        <div v-if="song.songFile" class="flex-grow h-full px-10 py-10 lg:px-24">
          <h2 class="main_red_text pt-4 pb-2 text-2xl">Now Playing</h2>
          <div class="lg:px-0">
            <h2 class="text-6xl">{{ song.songTitle }}</h2>
            <p class="font-semibold text-4xl pt-2">
              By<NuxtLink
                class="text-4xl main_red_text"
                :to="{ path: 'bandprofile', query: { band: band.id } }"
                ><em>{{ band.bandName }}</em></NuxtLink
              >
            </p>
          </div>
        </div>
        <div
          v-if="song.songFile"
          class="bg-black min-h-[112px] flex w-full items-center justify-center"
        >
          <audio id="music" height="0" width="0">
            <source id="audioSource" :src="song.songFile.url" />
          </audio>

          <img
            v-if="!isPlaying"
            class="mr-2 lg:mr-8"
            src="~/static/play.svg"
            alt="Play button"
            @click="play('play')"
          />
          <img
            v-else
            class="mr-8 h-[30px]"
            src="~/static/stop.svg"
            alt="stop button"
            @click="play('stop')"
          />
          <div class="progress w-4/5">
            <p class="start text-white text-center"></p>
            <div class="progress-bar">
              <div class="now"></div>
            </div>
            <p class="end text-white"></p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-full w-full xl:w-[66.7%] flex-grow py-6 bg-black mx-auto bottom-bar"
    >
      <p class="text-white chedder pl-[138px] lg:inline">
        <NuxtLink
          class="text-lg"
          :to="{ path: 'bandprofile', query: { band: band.id } }"
          >View Profile</NuxtLink
        >
      </p>
      <span class="font-semibold text-4xl pt-2">
        By<NuxtLink
          class="text-lg main_red_text"
          :to="{ path: 'bandprofile', query: { band: band.id } }"
          ><em>{{ band.bandName }}</em></NuxtLink
        >
      </span>
    </div>

    <section v-if="song.songFile" class="lg:mt-20">
      <!-- causing error in dom tree -->
      <table class="mx-auto w-full lg:w-4/6">
        <tr class="border-b-2 border-black py-8 h-[70px]">
          <th class="w-1/3 text-left chedder text-2xl pl-8">Track</th>
          <th class="w-1/3 text-center chedder text-2xl">Title</th>
          <th class="w-1/3 text-right chedder text-2xl pr-8">Favorite</th>
        </tr>
        <tr
          v-for="(songData, index) in songs"
          :key="index + 100"
          class="h-[70px] border-b-2 border-black"
        >
          <td class="w-1/3 text-left pl-8">
            <img
              v-if="thisSongPlaying === songData.id && isPlaying"
              class="h-[25px] inline pr-2 lg:pr-8"
              src="~/static/stop.svg"
              alt=""
              @click="setSong(songData, true)"
            /><img
              v-else
              class="inline pr-2 lg:pr-8"
              src="~/static/play.svg"
              alt=""
              @click="setSong(songData)"
            /><span class="ptmono">{{ index + 1 }} </span>
          </td>
          <td class="w-1/3 text-center ptmono">{{ songData.songTitle }}</td>
          <td class="w-1/3 text-right pr-8 ptmono">Favorite</td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
function conversion(value) {
  let minute = Math.floor(value / 60)
  minute = minute.toString().length === 1 ? '0' + minute : minute
  let second = Math.round(value % 60)
  second = second.toString().length === 1 ? '0' + second : second
  console.log(`${minute}:${second}`)
  return `${minute}:${second}`
}
export default {
  data() {
    return {
      band: {},
      album: {},
      songs: [],
      song: {},
      isPlaying: false,
      thisSongPlaying: '',
    }
  },

  async mounted() {
    try {
      const band = await this.$strapi.findOne('bands', this.$route.query.band)
      const album = await band.album.filter((album, index) => {
        return album.id === parseInt(this.$route.query.album)
      })
      this.band = band
      this.album = album[0]
      this.songs = album[0].songs
      this.song = album[0].songs[0]
    } catch (error) {
      return error
    }
  },
  methods: {
    play: function (target) {
      const audio = document.getElementById('music')
      const progressBar = document.querySelector('.progress-bar')
      const now = document.querySelector('.now')
      const start = document.querySelector('.start')
      const end = document.querySelector('.end')
      console.log(progressBar, now, audio.duration, start, end)
      conversion(audio.duration, 'song duration in time')
      if (target === 'play') {
        audio.play()
        this.isPlaying = true
      } else if (target === 'stop') {
        audio.pause()
        this.isPlaying = false
      }
    },
    stop: function () {
      const audio = document.getElementById('music')
      audio.pause()
      this.isPlaying = false
    },
    setSong: function (songData, stop) {
      this.song = songData
      const audio = document.getElementById('music')
      if (stop) {
        this.isPlaying = false
        audio.pause()
        this.ShowPause = !this.ShowPause
      } else {
        audio.load()
        audio.play()
        this.isPlaying = true
      }
      this.thisSongPlaying = songData.id
    },
  },
}
</script>

<style scoped>
.progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progress-bar {
  position: relative;
  width: 70%;
  height: 10px;
  background-color: #eee;
  vertical-align: 2px;
  border-radius: 3px;
  cursor: pointer;
}
.now {
  position: absolute;
  left: 0;
  display: inline-block;
  height: 10px;
  width: 70%;
  background: red;
}
.now:after {
  content: '';
  position: absolute;
  left: 100%;
  width: 2px;
  height: 10px;
  background-color: red;
}
@media (max-width: 500px) {
  .progress-bar {
    width: 60%;
  }
  .now {
    width: 60%;
  }
}
@media only screen and (min-width: 1273px) and (max-width: 1550px) {
  .bottom-bar {
    width: 100% !important;
    background: red;
  }
}
</style>

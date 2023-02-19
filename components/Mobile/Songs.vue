<template>
  <div>
    <div class="my-6 px-2">
      <ul v-if="band.bandSongs">
        <li v-for="song in band.bandSongs" :key="song.id" class="mt-6">
          <div class="flex items-center border-b-2 mb-2">
            <h3 class="pr-4 text-lg">{{ song.title }}</h3>
            <p class="chedder">({{ song.date }})</p>
            <div class="grow">
              <!-- <p class="text-right" @click="deleteData(song.id, 'bandSongs')">
                X Delete Song
              </p> -->
            </div>
          </div>
          <h4 class="text-base text-gray-700">Song Writers</h4>
          <ul v-if="song.songWriters">
            <li v-for="writer in song.songWriters" :key="writer.id">
              <p>{{ writer.name }}</p>
            </li>
          </ul>
          <h4
            v-if="song.lyricWriter.length > 0"
            class="text-base text-gray-700 mt-2"
          >
            Lyric Writers
          </h4>
          <ul v-if="song.lyricWriter.length > 0">
            <li v-for="writer in song.lyricWriter" :key="writer.id">
              <p>{{ writer.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    band: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
}
</script>

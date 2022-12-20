<template>
  <div>
    <section v-if="release" class="mx-auto w-full">
      <div v-if="release.mainImage" class="px-4">
        <div class="mx-auto my-6 w-[300px]">
          <div>
            <NuxtImg
              class=""
              :src="release.mainImage.url"
              alt=""
              height="300"
              width="300"
            />
          </div>
          <div class="w-full bg-black text-white px-2 py-4 flex items-center">
            <div>
              <p>{{ release.title }} ({{ release.date }})</p>
            </div>
          </div>
        </div>
        <div class="my-4">
          <h3>Label</h3>
          <p>{{ release.label }}</p>
        </div>
        <div class="my-4">
          <h3>History/Description</h3>
          <p>{{ release.bio }}</p>
        </div>
        <div class="my-4">
          <h3>Songs</h3>
          <p v-for="song in release.songList" :key="song.title">
            {{ song.title }}
          </p>
        </div>

        <div>
          <h3>Photos</h3>
          <div class="flex overflow-y-scroll gap-4 my-4">
            <NuxtImg
              v-for="image in release.images"
              :key="image.id"
              :src="image.pic.url"
              height="300"
              width="300"
            />
          </div>
        </div>
      </div>

      <div>
        <h3>Links</h3>
        <div v-for="link in release.rLink" :key="link.id">
          <a :href="link.link">{{ link.link }}</a>
        </div>
      </div>
    </section>
    <!-- <div v-if="release.songList.length > 0">
              <h2 class="text-xl">Song List</h2>
              <ul>
                <li v-for="song in release.songList" :key="song.title">
                  Title: {{ song.title }}
                </li>
              </ul>
            </div>
            <div
              v-if="release.images.length > 0"
              class="flex justify-center gap-4 items-center w-full flex-col my-6 md:flex-row"
            >
              <h2 class="text-xl">Images</h2>
              <div v-for="image in release.images" :key="image.pic.id">
                <NuxtImg :src="image.pic.url" alt="" height="200" width="200" />
              </div>
            </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      release: [],
    }
  },
  async fetch() {
    const band = await this.$strapi.findOne('bands', this.$route.query.bandId)
    this.release = band.releases.filter((r) => {
      return r.id.toString() === this.$route.query.releaseId
    })[0]
  },
}
</script>

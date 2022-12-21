<template>
  <div>
    <h1 class="text-2xl text-center my-6 text-main-red">Create Song</h1>
    <section class="container mx-auto w-11/12 md:w-3/4 my-6">
      <FormulateForm v-model="formValues" @submit="submitForm">
        <FormulateInput
          name="title"
          label="Title"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
        />

        <FormulateInput
          name="bio"
          label="History/Description"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
        />

        <FormulateInput
          name="date"
          label="date created"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
          type="date"
        />
        <div
          v-for="(sWriter, index) in songWriters"
          :key="index"
          class="sm:w-4/5 m-auto my-4"
        >
          <div class="my-6">
            <label for="link" class="label">Add Song writer</label>
            <input
              v-model="songWriters[index].name"
              class="formElement"
              name="name"
              placeholder="Name of song writer"
            />
          </div>
          <div
            @click="addSongWriter"
            class="px-4 py-2 bg-black text-white my-4 sm:w-4/5 m-auto"
          >
            + Add another song writer
          </div>
          <div
            v-if="index >= 1 && songWriters[index]"
            @click="removeSongWriter(index)"
            class="px-4 py-2 bg-black text-red-600 my-4 w-full m-auto"
          >
            - Remove song writer
          </div>
        </div>

        <div
          v-for="(lWriter, index) in lyricWriters"
          :key="index"
          class="sm:w-4/5 m-auto my-4"
        >
          <div class="my-6">
            <label for="link" class="label">Add a lyricWriter</label>
            <input
              v-model="lyricWriters[index].name"
              class="formElement"
              name="name"
              placeholder="Name of lyric writer"
            />
          </div>
          <div
            @click="addLyricWriter"
            class="px-4 py-2 bg-black text-white my-4 sm:w-4/5 m-auto"
          >
            + Add another lyric writer
          </div>
          <div
            v-if="index >= 1 && lyricWriters[index]"
            @click="removeLyricWriter(index)"
            class="px-4 py-2 bg-black text-red-600 my-4 w-full m-auto"
          >
            - Remove lyric writer
          </div>
        </div>

        <div
          v-for="(link, index) in links"
          :key="index"
          class="sm:w-4/5 m-auto my-4"
        >
          <div class="my-6">
            <label for="link" class="label">Add a Link</label>
            <input
              v-model="links[index].link"
              class="formElement"
              name="title"
              placeholder="Add title of song"
            />
          </div>
          <div
            @click="addLink"
            class="px-4 py-2 bg-black text-white my-4 sm:w-4/5 m-auto"
          >
            + Add another Link
          </div>
          <div
            v-if="index >= 1 && links[index]"
            @click="removeLink(index)"
            class="px-4 py-2 bg-black text-red-600 my-4 w-full m-auto"
          >
            - Remove Link
          </div>
        </div>

        <FormulateInput
          type="submit"
          label="Create"
          wrapper-class="w-full mt-10 px-4 sm:mx-10"
          grouping-class="bg-black"
          element-class="w-full"
        />
      </FormulateForm>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [{ link: '' }],
      songWriters: [{ name: '' }],
      lyricWriters: [{ name: '' }],
      formValues: {},
      loading: false,
      band: '',
    }
  },
  async mounted() {
    try {
      console.log(this.$route.query.band)
      this.band = await this.$strapi.findOne('bands', this.$route.query.band)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async submitForm() {
      this.formValues.songWriters = this.songWriters
      this.formValues.lyricWriters = this.lyricWriters
      try {
        await this.$strapi.update('bands', this.band.id, {
          bandSongs: [...this.band.bandSongs, this.formValues],
        })
        this.$router.push({
          path: '/bands/bandprofile',
          query: { band: this.band.id },
        })
      } catch (error) {
        console.log(error)
      }
    },

    addSongWriter() {
      this.songWriters.push({ name: '' })
    },
    removeSongWriter(index) {
      this.songWriters.splice(index, 1)
    },
    addLyricWriter() {
      this.lyricWriters.push({ name: '' })
    },
    removeLyricWriter(index) {
      this.lyricWriters.splice(index, 1)
    },
    addLink() {
      this.links.push({ link: '' })
    },
    removeLiink(index) {
      this.links.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped></style>

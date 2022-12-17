<template>
  <div>
    <h1 class="text-2xl text-center my-6 text-main-red">Create Releases</h1>
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
          name="label"
          label="Label"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
        />
        <FormulateInput
          name="date"
          label="date"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
          type="date"
        />
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
        <h2 class="text-center mb-10 mt-4">Add main image</h2>
        <FormulateInput
          type="image"
          name="mainImage"
          label="Select an image to upload"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png,image/gif,image/webp"
          input-class="w-full sm:w-96 "
          wrapper-class="w-full sm:w-96 "
          element-class="w-full sm:w-96 "
          @change="mainImageFile = $event.target.files[0]"
        />
        <h2 class="text-xl">Add Songs</h2>
        <div
          v-for="(song, index) in songList"
          :key="index"
          class="sm:w-4/5 m-auto my-4"
        >
          <div class="my-6">
            <label for="bandToAdd" class="label">Add a Song Title</label>
            <input
              v-model="songList[index].title"
              class="formElement"
              name="title"
              placeholder="Add title of song"
            />
          </div>
          <div
            @click="addSong"
            class="px-4 py-2 bg-black text-white my-4 sm:w-4/5 m-auto"
          >
            + Add another Song
          </div>
          <div
            v-if="index >= 1 && songList[index]"
            @click="removeSong(index)"
            class="px-4 py-2 bg-black text-red-600 my-4 w-full m-auto"
          >
            - Remove song
          </div>
        </div>
        <h2 class="text-xl">Add Photos</h2>
        <FormulateInput
          type="group"
          name="images"
          :repeatable="true"
          label="Add Photos"
          add-label="+ Add Photo"
          wrapper-class="w-full"
          element-class="w-full"
        >
          <div>
            <FormulateInput
              type="image"
              name="pic"
              label="add photos"
              help="Select a png, jpg or gif to upload."
              validation="mime:image/jpeg,image/png,image/gif"
              input-class="w-full sm:w-96 "
              wrapper-class="w-full sm:w-96 "
              element-class="w-full sm:w-96 "
              @change="addPic($event.target.files[0])"
            />
          </div>
        </FormulateInput>

        <FormulateInput
          type="submit"
          label="Create"
          wrapper-class="w-full mt-10 px-4 sm:mx-10"
          grouping-class="bg-black"
          element-class="w-full"
        />
      </FormulateForm>
    </section>
    <pre>{{ pictures }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songList: [{ title: '' }],
      links: [{ link: '' }],
      formValues: {},
      mainImage: '',
      mainImageFile: '',
      loading: false,
      pictures: [],
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
    addPic(val) {
      console.log(this.formValues.images)
    },
    async submitForm() {
      this.formValues.songList = this.songList
      this.formValues.releaseLinks = this.links

      if (this.formValues.images) {
        const pictures = []
        for (let index = 0; index < this.formValues.images.length; index++) {
          const formData = new FormData()
          formData.append(
            'files',
            this.formValues.images[index].pic.files[0].file
          )
          const [image] = await this.$strapi.create('upload', formData)

          pictures.push({ image })
          console.log('adding pictures ', pictures)
        }
        this.pictures = pictures
        console.log('pictures', this.pictures)

        this.formValues.images = pictures.map((i) => {
          return { pic: i.image }
        })
      }
      try {
        const formData = new FormData()
        await formData.append('files', this.mainImageFile)
        const [mainImage] = await this.$strapi.create('upload', formData)
        this.mainImage = mainImage
        this.formValues.mainImage = mainImage
      } catch (error) {
        console.log(error, 'error in uploading main image ')
        this.loading = false
        this.errorMessage =
          'Could not upload the main Image ... please try again '
      }
      try {
        await this.$strapi.update('bands', this.band.id, {
          releases: [...this.band.releases, this.formValues],
        })

        this.$router.push({
          path: '/bands/bandprofile',
          query: { band: this.band.id },
        })
      } catch (error) {
        console.log(error)
      }
    },
    addSong() {
      this.songList.push({ title: '' })
    },
    removeSong(index) {
      this.songList.splice(index, 1)
    },
    addLink() {
      this.links.push({ link: '' })
    },
    removeLink(index) {
      this.links.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped></style>

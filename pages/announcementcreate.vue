<template>
  <!-- only workds for a band profile for now look at how query and conditionals are set up  -->
  <div>
    <h1 class="text-center">Create Announcement</h1>
    <section class="container mx-auto mb-6">
      <FormulateForm v-model="formValues" @submit="createBandAnn">
        <FormulateInput
          name="title"
          label="title"
          wrapper-class="m-auto sm:w-4/5 "
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />

        <FormulateInput
          name="text"
          label="Announcement"
          wrapper-class="sm:w-4/5 m-auto"
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <h2 class="text-center">Add Image</h2>
        <FormulateInput
          type="image"
          name="image"
          label="Upload an Image"
          validation="mime:image/jpeg,image/png,image/gif"
          input-class="w-full sm:w-96 "
          wrapper-class="m-auto sm:w-4/5 "
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
          @change="annImageFile = $event.target.files[0]"
        />

        <div class="flex justify-center items-center">
          <FormulateInput
            type="submit"
            label="Next"
            wrapper-class="w-full mt-10 px-4 sm:mx-10"
            grouping-class="bg-black"
            element-class="w-1/2"
          />
        </div>
      </FormulateForm>
    </section>
    <section
      v-if="loading"
      class="w-screen h-screen fixed flex justify-center items-center top-0 z-50"
    >
      <Spinner />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
      annImageFile: '',
      annImageFinal: '',
      profileId: '',
      profileType: '',
      prfileName: '',
      loading: false,
    }
  },

  methods: {
    async createBandAnn() {
      const b = await this.$strapi.findOne('bands', 28)
      if (this.annImageFile) {
        try {
          this.loading = true
          const formData = new FormData()
          await formData.append('files', this.annImageFile)
          const [annImageFinal] = await this.$strapi.create('upload', formData)
          this.annImageFinal = annImageFinal
        } catch (error) {
          console.log(error, 'the image did not upload proper ')
        }
      }
      if (this.annImageFinal) {
        const announ = {
          title: this.formValues.title,
          text: this.formValues.text,
          image: this.annImageFinal,
        }
        b.announcements.push(announ)
      }
      const announ = {
        title: this.formValues.title,
        text: this.formValues.text,
      }
      b.announcements.push(announ)
      const band = await this.$strapi.update('bands', 28, {
        announcements: [...b.announcements],
      })
      // if title route to title

      if (band) {
        console.log('this is the band ')
        this.$router.push({
          path: 'announcement',
          query: {
            profileId: band.id,
            title: announ.title,
            profileType: 'bands',
            profileName: band.bandName,
          },
        })
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>

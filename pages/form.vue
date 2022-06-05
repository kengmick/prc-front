<template>
  <div>
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
    <h1 class="main_red_text text-center">Create Your Band Profile</h1>
    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <section class="px-4 mt-10 sm:m-20">
            <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
              Add Images
            </h2>
            <div class="flex w-full justify-center">
              <FormulateInput
                type="image"
                name="logo"
                label="Select an logo to upload"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                input-class="w-full sm:w-96 "
                wrapper-class="w-full sm:w-96 "
                element-class="w-full sm:w-96 "
                @change="logoImgFile = $event.target.files[0]"
              />
            </div>
            <div class="flex w-full justify-center">
              <FormulateInput
                name="description"
                type="textarea"
                label="Add a description"
                input-class="w-full sm:w-96 h-72"
                wrapper-class="w-full sm:w-96 h-72"
                element-class="w-full sm:w-96 h-72"
              />
            </div>
          </section>
          <div>
            <FormulateInput
              type="submit"
              label="Next"
              wrapper-class="w-full mt-10 px-4 sm:mx-10"
              grouping-class="bg-black"
              element-class="w-full"
            />
          </div>
        </FormulateForm>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
      errorMessage: '',
      band: {},
      created: false,
      logoImgFile: '',
      venueImgFile: '',
      logoImageFinal: '',
      venueImgFinal: '',
      showPosters: [],
    }
  },
  methods: {
    async submitForm() {
      try {
        const formData = new FormData()
        await formData.append('files', this.venueImgFile)
        const [venueImgFinal] = await this.$strapi.create('upload', formData)
        this.venueImgFinal = venueImgFinal
        this.formValues.venueImg = venueImgFinal
      } catch (error) {
        console.log(error)
      }
      try {
        const venue = await this.$strapi.create('venues', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        this.venue = venue
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
        console.log('there was a problem')
      }
      // after creation take user to band admin
      if (this.band) {
        this.$router.push({
          path: '/venueprofile',
          query: { venue: this.venue.id },
        })
      }
    },
  },
}
</script>

<style scoped>
.center-custom {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>

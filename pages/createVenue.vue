<template>
  <div>
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
    <h1 class="main_red_text text-center">Create Your Band Profile</h1>
    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <div class="flex-col sm:flex sm:flex-row">
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                name="name"
                label="Venue Name"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />

              <FormulateInput
                name="genreAlt"
                :options="{
                  punk: 'Punk',
                  ska: 'Ska',
                  hardcore: 'hardcore',
                  thrash: 'thrash',
                }"
                type="select"
                label="What is the genre"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="dateOpened"
                type="date"
                label="Date Opened"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="streetNumber"
                type="number"
                label="Street Number"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="contact"
                type="text"
                label="contact"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
            </div>
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                name="streetName"
                type="type"
                label="Street Name"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="state"
                label="State"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="city"
                label="City"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="genreAlt"
                :options="{
                  punk: 'Punk',
                  rock: 'Rock',
                  hardcore: 'hardcore',
                  ska: 'ska',
                }"
                type="select"
                label="What is the genre"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
            </div>
          </div>
          <section class="px-4 mt-10 sm:m-20">
            <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
              Add Venue Logo
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
            <!-- logo -->
            <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
              Add an image of the venue
            </h2>
            <div class="flex w-full justify-center">
              <FormulateInput
                type="image"
                name="venueImg"
                label="Select an image of venue to upload"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                input-class="w-full sm:w-96 "
                wrapper-class="w-full sm:w-96 "
                element-class="w-full sm:w-96 "
                @change="venueImgFile = $event.target.files[0]"
              />
            </div>
            <!-- <div v-if="image">
              <img :src="image[0].url" alt="fdsfadsf" />
            </div> -->
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
      // uploading bandProfileImg
      try {
        const formData = new FormData()
        await formData.append('files', this.logoImgFile)
        const [logoImageFinal] = await this.$strapi.create('upload', formData)
        this.logoImageFinal = logoImageFinal
        this.formValues.logo = logoImageFinal
      } catch (error) {
        console.log(error)
      }
      try {
        const formData = new FormData()
        await formData.append('files', this.venueImgFile)
        const [venueImgFinal] = await this.$strapi.create('upload', formData)
        this.venueImgFinal = venueImgFinal
        this.formValues.venueImg = venueImgFinal
      } catch (error) {
        console.log(error)
      }
      // old shows array
      // making post band to strapi
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

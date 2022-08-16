<template>
  <div>
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
    <h1 class="main_red_text text-center">Edit Your Venue Profile</h1>
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
                name="dateOpened"
                type="date"
                label="Date Opened"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />

              <FormulateInput
                name="streetAddress"
                label="Address"
                wrapper-class="sm:w-4/5 m-auto mb-4"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <!-- <FormulateInput
                v-if="acc === 1"
                name="contact"
                type="text"
                label="contact"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              /> -->
            </div>
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                name="country"
                label="Country other than USA?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="formValues.country = $event.target.value"
              />
              <FormulateInput
                v-if="
                  !formValues.country && formValues.country !== 'United States'
                "
                name="state"
                label="state?"
                wrapper-class="sm:w-4/5 m-auto"
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
            </div>
          </div>
          <section class="px-4 mt-10 sm:m-20">
            <h2>Add Logo</h2>
            <div>
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
            <h2 class="my-4">Add Venue Image</h2>
            <div>
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
            <h2 class="my-4">Edit Photos</h2>
            <!-- <pre>{{ venue.photos }}</pre> -->
            <section
              v-if="venue.photos"
              class="flex flex-col sm:flex-row justify-around items-center"
            >
              <div v-for="photo in venue.photos" :key="photo.url">
                <img :src="photo.pic.formats.thumbnail.url" alt="" />
                <div
                  class="flex items-center justify-center p-[.8em] w-11/12 mx-auto sm:w-3/4 lg:w-1/2 mt-6 mb-2 bg-black text-white"
                >
                  Edit
                </div>
                <div
                  class="flex items-center justify-center p-[.8em] w-11/12 mx-auto sm:w-3/4 lg:w-1/2 mb-2 bg-black text-white"
                >
                  Delete
                </div>
              </div>
            </section>
            <!-- <pre>{{ venue.photos }}</pre> -->

            <!-- <FormulateInput
              type="group"
              name="photos"
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
                />
              </div>
            </FormulateInput> -->
            <h2 class="my-4">Add Contacts</h2>
            <div v-if="acc === 2">
              <FormulateInput
                type="group"
                name="altContacts"
                :repeatable="true"
                label="Contacts"
                add-label="+ Add contact"
                wrapper-class="w-full"
                element-class="w-full"
              >
                <FormulateInput
                  name="contact"
                  label="Countact Info"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
              </FormulateInput>
              <h2 class="my-4">Add Links</h2>
              <FormulateInput
                type="group"
                name="links"
                :repeatable="true"
                label="Links"
                add-label="+ Add link"
                wrapper-class="w-full"
                element-class="w-full"
              >
                <FormulateInput
                  name="link"
                  label="https://somelink.com"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
              </FormulateInput>
            </div>
            <!-- end of links and contacts repeatable  -->
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
    <section
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <Spinner />
    </section>
    <section
      v-if="errorMessage"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <div>
        <h2>{{ errorMessage }}</h2>
        <h3
          class="text-center text-2xl cursor-pointer"
          @click="errorMessage = null"
        >
          Close X
        </h3>
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
      venue: {},
      band: {},
      created: false,
      logoImgFile: '',
      venueImgFile: '',
      logoImageFinal: '',
      venueImgFinal: '',
      showPosters: [],
      changeProfile: false,
      acc: 1,
      loading: false,
    }
  },
  async mounted() {
    try {
      const user = await this.$strapi.findOne('users', this.$strapi.user.id)
      this.acc = user.acc || 1
    } catch (error) {
      this.$nuxt.error({ statusCode: 404, message: error })
    }

    try {
      const venue = await this.$strapi.findOne(
        'venues',
        this.$route.query.venue
      )
      this.venue = venue
      this.formValues = venue
    } catch (error) {
      this.$nuxt.error({ statusCode: 404, message: error })
    }
  },
  methods: {
    async submitForm() {
      this.loading = true
      // const pictures = []
      // if (this.formValues.photos) {
      //   console.log('this is the photos condition')
      //   for (let index = 0; index < this.formValues.photos.length; index++) {
      //     const formData = new FormData()
      //     formData.append(
      //       'files',
      //       this.formValues.photos[index].pic.files[0].file
      //     )
      //     const [image] = await this.$strapi.create('upload', formData)

      //     pictures.push({ pic: image })
      //     console.log('adding pictures ', pictures)
      //   }
      //   this.pictures = pictures
      //   this.formValues.photos = pictures
      // }
      if (this.logoImgFile) {
        console.log('logo image file ')
        try {
          console.log('logo file upload')
          const formData = new FormData()
          await formData.append('files', this.logoImgFile)
          const [logoImageFinal] = await this.$strapi.create('upload', formData)
          this.logoImageFinal = logoImageFinal
          this.formValues.logo = logoImageFinal
        } catch (error) {
          console.log(error)
        }
      }

      if (this.venueImgFile) {
        console.log('venue image file')
        try {
          const formData = new FormData()
          await formData.append('files', this.venueImgFile)
          const [venueImgFinal] = await this.$strapi.create('upload', formData)
          this.venueImgFinal = venueImgFinal
          this.formValues.venueImg = venueImgFinal
        } catch (error) {
          console.log(error)
        }
      }
      // uploading bandProfileImg
      if (this.logoImgFile) {
        try {
          const formData = new FormData()
          await formData.append('files', this.logoImgFile)
          const [logoImageFinal] = await this.$strapi.create('upload', formData)
          this.logoImageFinal = logoImageFinal
          this.formValues.logo = logoImageFinal
        } catch (error) {
          console.log(error)
        }
      }

      // old shows array
      // making post band to strapi
      try {
        const venue = await this.$strapi.update('venues', this.venue.id, {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        this.venue = venue
        this.loading = false
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
        this.loading = false
        console.log('there was a problem in creating the venue ')
      }
      // after creation take user to band admin
      if (this.venue) {
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

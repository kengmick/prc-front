<template>
  <div>
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
    <h1 class="main_red_text text-center">Edit Event</h1>
    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <div class="flex-col sm:flex sm:flex-row">
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                name="title"
                label="Event Title"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="date"
                type="date"
                label="Date of event"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />

              <FormulateInput
                name="venueName"
                type="text"
                label="Event Venue"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
            </div>
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                name="streetName"
                type="text"
                label="Street Name"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="steetAddress"
                type="number"
                label="Street Number"
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
            </div>
          </div>

          <section class="px-4 mt-10 sm:m-20">
            <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
              List Bands Playing
            </h2>
            <FormulateInput
              type="group"
              name="bandsPlaying"
              :repeatable="true"
              label="Band Playing"
              add-label="+ Add bands"
              wrapper-class="w-full"
              element-class="w-full"
            >
              <div>
                <FormulateInput
                  name="BandName"
                  label="Add band name"
                  required="true"
                  wrapper-class="w-full"
                  element-class="w-full"
                />
              </div>
            </FormulateInput>
            <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
              Add Event Poster
            </h2>
            <div class="flex w-full justify-center">
              <FormulateInput
                type="image"
                name="eventPoster"
                label="Add Event Poster"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                input-class="w-full sm:w-96 "
                wrapper-class="w-full sm:w-96 "
                element-class="w-full sm:w-96 "
                @change="eventPosterFile = $event.target.files[0]"
              />
            </div>
            <div class="flex w-full justify-center">
              <FormulateInput
                name="eventDescription"
                type="textarea"
                label="Add a description of event"
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
import moment from 'moment'
export default {
  data() {
    return {
      formValues: {},
      errorMessage: '',
      event: {},
      created: false,
      eventPosterFile: '',
      eventPosterFinal: '',
      end: '',
    }
  },
  async mounted() {
    try {
      const event = await this.$strapi.findOne(
        'events',
        this.$route.query.event
      )
      this.formValues = event
    } catch (error) {
      this.$nuxt.error({ statusCode: 404, message: error })
    }
  },
  methods: {
    moment,
    async submitForm() {
      // uploading bandProfileImg
      if (this.eventPosterFile) {
        try {
          const formData = new FormData()
          await formData.append('files', this.eventPosterFile)
          const [eventPosterFinal] = await this.$strapi.create(
            'upload',
            formData
          )
          this.eventPosterFinal = eventPosterFinal
          this.formValues.eventPoster = eventPosterFinal
        } catch (error) {
          console.log(error)
        }
      }
      try {
        const event = await this.$strapi.create('events', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        this.event = event
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
        console.log('there was a problem')
      }
      // after creation take user to band admin
      if (this.event) {
        this.$router.push({
          path: '/eventview',
          query: { event: this.event.id },
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

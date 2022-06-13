<template>
  <div class="px-2 sm:conatiner mx-auto my-6 sm:w-1/2">
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->

    <FormulateForm v-model="formValues" @submit="submitForm">
      <h1 class="main_red_text text-left text-3xl sm:w-4/5 mb-6">
        Create Tour
      </h1>
      <FormulateInput
        name="title"
        label="Tour Title"
        wrapper-class=" sm:w-4/5 "
        element-class="w-full"
        errors-class="sm:w-4/5 "
      />
      <!-- <FormulateInput
        name="date"
        type="date"
        label="Date Starts"
        wrapper-class="sm:w-4/5 "
        element-class="w-full"
        errors-class="sm:w-4/5 "
      /> -->
      <!-- <FormulateInput
        name="dateEnds"
        type="date"
        label="Date Ends"
        wrapper-class="sm:w-4/5 "
        element-class="w-full"
        errors-class="sm:w-4/5 "
      /> -->

      <h2 class="text-left main_red_text text-2xl mb-10 mt-4">Bands On Tour</h2>
      <!-- <FormulateInput
        type="group"
        name="touringBands"
        :repeatable="true"
        label="Band Playing"
        add-label="+ Add bands"
        wrapper-class="sm:w-4/5 "
        element-class="w-full"
        errors-class="sm:w-4/5 "
      >
        <FormulateInput
          name="BandName"
          label="Add band name"
          wrapper-class="sm:w-4/5 "
          element-class="w-full"
          input-class="w-full"
          errors-class="sm:w-4/5 "
        />
      </FormulateInput> -->
      <h2 class="text-left main_red_text text-2xl mb-10 mt-4">
        Add Tour Poster
      </h2>
      <FormulateInput
        type="image"
        name="touringPoster"
        label="Add Tour Poster"
        validation="mime:image/jpeg,image/png,image/gif"
        input-class="w-full sm:w-96 "
        wrapper-class="sm:w-4/5 "
        element-class="w-full"
        errors-class="sm:w-4/5 "
        @change="tourPosterFile = $event.target.files[0]"
      />
      <h2 class="text-left main_red_text text-2xl mb-10 mt-4">
        Add Events of Tour
      </h2>
      <!-- Events  -->
      <div class="">
        <div class="w-full">
          <!-- needs to be group  -->

          <div>
            <FormulateInput
              type="group"
              name="tourEvents"
              :repeatable="true"
              label="Events"
              add-label="+ Add Events"
              wrapper-class="w-full"
              element-class="w-full"
            >
              <div>
                <FormulateInput
                  name="title"
                  label="Event Title"
                  wrapper-class=" sm:w-4/5 "
                  element-class="w-full"
                  errors-class="sm:w-4/5 "
                />

                <FormulateInput
                  name="venueName"
                  type="text"
                  label="Event Venue"
                  wrapper-class="sm:w-4/5 "
                  element-class="w-full"
                  errors-class="sm:w-4/5 "
                />
                <!-- <FormulateInput
                  name="streetName"
                  type="text"
                  label="Street Name"
                  wrapper-class=" sm:w-4/5 "
                  element-class="w-full"
                  errors-class="sm:w-4/5 "
                />
                <FormulateInput
                  name="streetNumber"
                  type="number"
                  label="Street Number"
                  wrapper-class="sm:w-4/5 "
                  element-class="w-full"
                  errors-class="sm:w-4/5 "
                />
                <FormulateInput
                  name="state"
                  label="State"
                  wrapper-class=" sm:w-4/5 "
                  element-class="w-full"
                  errors-class="sm:w-4/5 "
                />
                <FormulateInput
                  name="city"
                  label="City"
                  wrapper-class="sm:w-4/5 "
                  element-class="w-full"
                  errors-class="sm:w-4/5 "
                /> -->
                <FormulateInput
                  type="image"
                  name="eventPoster"
                  label="Select an image to upload"
                  help="Select a png, jpg or gif to upload."
                  validation="mime:image/jpeg,image/png,image/gif"
                  input-class="w-full sm:w-96 "
                  wrapper-class="w-full sm:w-96 "
                  element-class="w-full sm:w-96 "
                />
              </div>
            </FormulateInput>
          </div>
        </div>
      </div>

      <section class="px-4 mt-10">
        <h2 class="text-left main_red_text text-2xl mb-10 mt-4">
          Bands At Event
        </h2>
        <FormulateInput
          type="group"
          name="bandsPlaying"
          :repeatable="true"
          label="Band Playing"
          add-label="+ Add bands"
          wrapper-class=" sm:w-4/5 "
          element-class="w-full"
          errors-class="sm:w-4/5 "
        >
          <div>
            <FormulateInput
              name="BandName"
              label="Add band name"
              required="true"
              wrapper-class=" sm:w-4/5 "
              element-class="w-full"
              errors-class="sm:w-4/5 "
            />
          </div>
        </FormulateInput>
      </section>
      <!-- end of add event to tour  -->
      <FormulateInput
        type="submit"
        label="Next"
        wrapper-class="w-full mt-10 px-4 sm:mx-10"
        grouping-class="bg-black"
        element-class="w-full"
      />
    </FormulateForm>
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
      tour: {},
      created: false,
      tourPosterFile: '',
      tourPosterFinal: '',
      eventPosterFile: '',
      eventPosterFinal: '',
      end: '',
      tourEvents: [],
    }
  },
  methods: {
    moment,
    async log() {
      const events = []
      for (let index = 0; index < this.formValues.tourEvents.length; index++) {
        console.log(
          'testing ',
          this.formValues.tourEvents[index].eventPoster.files[0].file
        )
        const formData = new FormData()
        formData.append(
          'files',
          this.formValues.tourEvents[index].eventPoster.files[0].file
        )
        const [image] = await this.$strapi.create('upload', formData)
        events.push({
          ...this.formValues.tourEvents[index],
          eventPoster: image,
        })
      }
      this.formValues.tourEvents = events
      console.log(events)
    },
    async submitForm() {
      const events = []
      for (let index = 0; index < this.formValues.tourEvents.length; index++) {
        console.log(
          'testing ',
          this.formValues.tourEvents[index].eventPoster.files[0].file
        )
        const formData = new FormData()
        formData.append(
          'files',
          this.formValues.tourEvents[index].eventPoster.files[0].file
        )
        const [image] = await this.$strapi.create('upload', formData)
        events.push({
          ...this.formValues.tourEvents[index],
          eventPoster: image,
        })
      }
      this.formValues.tourEvents = await events

      try {
        const formData = new FormData()
        await formData.append('files', this.tourPosterFile)
        const [tourPosterFinal] = await this.$strapi.create('upload', formData)
        this.tourPosterFinal = tourPosterFinal
        this.formValues.touringPoster = tourPosterFinal
      } catch (error) {
        console.log(error)
      }
      try {
        const tour = await this.$strapi.create('tours', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        this.tour = tour
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
        console.log('there was a problem', error)
      }
      // after creation take user to band admin
      if (this.tour) {
        this.$router.push({
          path: '/tourview',
          query: { tour: this.tour.id },
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

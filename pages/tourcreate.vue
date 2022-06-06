<template>
  <div class="px-2 sm:conatiner mx-auto">
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
    <h1 class="main_red_text text-center text-3xl">Create Tour</h1>
    <FormulateForm v-model="formValues" @submit="submitForm">
      <FormulateInput
        name="title"
        label="Tour Title"
        wrapper-class="m-auto sm:w-4/5 "
        element-class="w-full"
        errors-class="sm:w-4/5 m-auto"
      />
      <!-- <FormulateInput
        name="date"
        type="date"
        label="Date Starts"
        wrapper-class="sm:w-4/5 m-auto"
        element-class="w-full"
        errors-class="sm:w-4/5 m-auto"
      />
      <FormulateInput
        name="dateEnds"
        type="date"
        label="Date Ends"
        wrapper-class="sm:w-4/5 m-auto"
        element-class="w-full"
        errors-class="sm:w-4/5 m-auto"
      /> -->

      <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
        List Bands Playing
      </h2>
      <FormulateInput
        type="group"
        name="touringBands"
        :repeatable="true"
        label="Band Playing"
        add-label="+ Add bands"
        wrapper-class="w-full"
        element-class="w-full"
      >
        <FormulateInput
          name="BandName"
          label="Add band name"
          required="true"
          wrapper-class="w-full"
          element-class="w-full"
        />
      </FormulateInput>
      <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
        Add Event Poster
      </h2>
      <FormulateInput
        type="image"
        name="touringPoster"
        label="Add Tour Poster"
        help="Select a png, jpg or gif to upload."
        validation="mime:image/jpeg,image/png,image/gif"
        input-class="w-full sm:w-96 "
        wrapper-class="w-full sm:w-96 "
        element-class="w-full sm:w-96 "
        @change="tourPosterFile = $event.target.files[0]"
      />
      <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
        Add Events of Tour
      </h2>
      <!-- add events  -->
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
            type="datetime-local"
            label="Date of event"
            wrapper-class="sm:w-4/5 m-auto"
            element-class="w-full"
            errors-class="sm:w-4/5 m-auto"
          />
          <!-- <FormulateInput
            name="timeEnd"
            type="time"
            label="Date of event"
            wrapper-class="sm:w-4/5 m-auto"
            element-class="w-full"
            errors-class="sm:w-4/5 m-auto"
          /> -->

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
            name="streetNumber"
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
    async submitForm() {
      // uploading bandProfileImg
      try {
        const formData = new FormData()
        await formData.append('files', this.eventPosterFile)
        const [eventPosterFile] = await this.$strapi.create('upload', formData)
        this.eventPosterFile = eventPosterFile
        this.tourEvents.push(this.formValues.tourEvents)
        this.formValues.tourEvents = this.tourEvents
      } catch (error) {
        console.log(error)
      }
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
        console.log('there was a problem')
      }
      // after creation take user to band admin
      if (this.tour) {
        this.$router.push({
          path: '/tourview',
          query: { tour: 1 },
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

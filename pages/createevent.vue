<template>
  <div>
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
    <h1 class="main_red_text text-center">Create Show</h1>

    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <div class="flex-col sm:flex sm:flex-row">
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                name="title"
                label="Title"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="headlinerOne"
                label="Headlining Band"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />

              <FormulateInput
                v-if="userBands"
                value="null"
                type="select"
                name="bandName"
                label="Add show to a band you created Optional?"
                :options="{ ...userBands, clear: 'clear form' }"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="clear($event.target.value)"
              />

              <!-- <FormulateInput
                v-if="userDistros"
                value="null"
                type="select"
                name="distroName"
                label="Add show to your distro Optional?"
                :options="userDistros"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              /> -->
              <FormulateInput
                v-if="userTours"
                value="null"
                type="select"
                name="tourName"
                label="Add Show to your tour Optional?"
                :options="{ ...userTours, clear: 'clear form' }"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="clearTour($event.target.value)"
              />
              <FormulateInput
                v-if="userVenues"
                value="null"
                type="select"
                name="venueName"
                label="Add Show to your Venue Optional?"
                :options="userVenues"
                wrapper-class="sm:w-4/5 m-auto"
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
                name="timeStarts"
                type="time"
                step="0.000"
                label="Time Event Begins"
                placeholder="5555 wolf ave"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="log($event.target.value)"
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
                v-if="
                  !formValues.country || formValues.country === 'United States'
                "
                name="streetAddress"
                validation="required"
                type="text"
                label="Street Address and Name"
                placeholder="5555 wolf ave"
                wrapper-class="sm:w-4/5 m-auto mb-4"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="country"
                label="Country other than the USA"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="formValues.country = $event.target.values"
              />
              <FormulateInput
                v-if="
                  !formValues.country && formValues.country !== 'United States'
                "
                name="state"
                label="State"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                validation="required"
              />
              <FormulateInput
                name="city"
                label="City"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                validation="required"
              />
            </div>
          </div>

          <section class="px-4 mt-10 sm:m-20">
            <!-- <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
              List Bands Playing
            </h2> -->
            <!-- list of bands playing optional  <FormulateInput
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
            </FormulateInput> -->
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
      // profiles to populate form options
      userBands: null,
      userVenues: null,
      userTours: null,
      userDistros: null,
      // profiles array
      bands: [],
      venues: [],
      tours: [],
      distros: [],
      loading: false,
      tour: null,
      tourEvent: null,
    }
  },
  async mounted() {
    // finds all band to populate form
    try {
      const bands = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.bands = bands
      const o = {}
      bands.forEach((b) => {
        o[b.bandName] = b.bandName
      })
      // This is user band for the full
      this.userBands = o
      console.log(this.userBands)
    } catch (error) {
      this.userBands = null
      console.log(error)
    }
    // venues
    try {
      const venues = await this.$strapi.find('venues', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.venues = venues
      const o = {}
      venues.forEach((v) => {
        o[v.name] = v.name
      })
      // This is user band for the full
      this.userVenues = o
    } catch (error) {
      this.userVenues = null
      console.log(error)
    }
    // distros
    // must work on later
    try {
      const distros = await this.$strapi.find('record-labels', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.distros = distros
      const o = {}
      distros.forEach((d) => {
        o[d.name] = d.name
      })
      // This is user band for the full
      this.userDistros = o
    } catch (error) {
      this.userDistros = null
      console.log(error)
    }
    // tour
    try {
      const tours = await this.$strapi.find('tours', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.tour = tours
      const o = {}
      tours.forEach((t) => {
        console.log(t, ' this is the tour')
        o[t.title] = t.title
      })
      // This is user band for the full
      this.userTours = o
    } catch (error) {
      this.userTours = null
      console.log(error)
    }
  },

  methods: {
    moment,
    log(val) {
      const d = (val += ':00.000')
      console.log(d)
    },
    clear(val) {
      if (val === 'clear') {
        this.formValues.bandName = null
      }
    },
    async clearTour(val) {
      if (val === 'clear') {
        this.formValues.tourName = null
      } else {
        try {
          console.log(val)
          const t = await this.$strapi.find('tours', { title: val })
          // sets the tour in data objects
          this.tour = t[0]
          console.log(t)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async submitForm() {
      // uploading bandProfileImg
      this.loading = true
      if (this.formValues.timeStarts) {
        this.formValues.timeStarts = this.formValues.timeStarts += ':00.000'
      }
      try {
        const formData = new FormData()
        await formData.append('files', this.eventPosterFile)
        const [eventPosterFinal] = await this.$strapi.create('upload', formData)
        this.eventPosterFinal = eventPosterFinal
        this.formValues.eventPoster = eventPosterFinal
      } catch (error) {
        console.log(error, '351: error in uploading event poster ')
        this.loading = false
        this.errorMessage =
          'Could not upload the event poster ... please try again '
      }
      try {
        // if user picks band find band but not a tour
        if (
          this.formValues.bandName !== 'null' &&
          this.formValues.tourName === 'null'
        ) {
          console.log('this is the bandName conditional not the tour  ')
          const b = this.bands.filter((band) => {
            return band.bandName === this.formValues.bandName
          })
          console.log(b)
          this.formValues.bandName = b[0]
          const event = await this.$strapi.create('events', {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          })

          await this.$strapi.update('bands', b[0].id, {
            events: [...b[0].events, event],
          })
          this.event = event
          this.loading = false
        }
        // if band and tour name
        if (
          this.formValues.bandName !== 'null' &&
          this.formValues.tourName !== 'null'
        ) {
          console.log('this is the band and tour  conditional ')
          const b = this.bands.filter((band) => {
            return band.bandName === this.formValues.bandName
          })
          this.formValues.bandName = b[0]
          const event = await this.$strapi.create('events', {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          })
          this.event = event
          // put band id and update the band
          await this.$strapi.update('bands', b[0].id, {
            events: [...b[0].events, event],
          })
          await this.$strapi.update('tours', this.tour.id, {
            events: [...this.tour.events, event],
          })
        }
        // if user picks a tour but not a band
        if (
          this.formValues.bandName === 'null' &&
          this.formValues.tourName !== 'null'
        ) {
          this.formValues.bandName = null
          const event = await this.$strapi.create('events', {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          })
          this.event = event
          // put band id and update the band
          await this.$strapi.update('tours', this.tour.id, {
            events: [...this.tour.events, event],
          })
        }
        // if user does not pick a band or a tour
      } catch (error) {
        console.log('form vals', this.formValues)
        console.log(error, 'there was an error in creating an event  ')
        this.loading = false
        this.errorMessage = 'Sorry, something went wrong ... please try again '
      }

      if (
        this.formValues.bandName === 'null' &&
        this.formValues.tourName === 'null'
      ) {
        // user does not pick band our tour
        this.formValues.bandName = null
        const event = await this.$strapi.create('events', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        this.event = event
        this.loading = false
      }
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

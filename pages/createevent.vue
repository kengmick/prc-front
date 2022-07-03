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
                v-if="userBands"
                type="select"
                name="bandName"
                label="Pick Your Band Optional?"
                :options="userBands"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-if="userDistros"
                type="select"
                name="distroName"
                label="Pick Your Distro Optional?"
                :options="userDistros"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-if="userTours"
                type="select"
                name="tourName"
                label="Pick Your Tour Optional?"
                :options="userTours"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-if="userVenues"
                type="select"
                name="venueName"
                label="Pick Your Venue Optional?"
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
    async submitForm() {
      // uploading bandProfileImg
      try {
        const formData = new FormData()
        await formData.append('files', this.eventPosterFile)
        const [eventPosterFinal] = await this.$strapi.create('upload', formData)
        this.eventPosterFinal = eventPosterFinal
        this.formValues.eventPoster = eventPosterFinal
      } catch (error) {
        console.log(error)
      }
      try {
        // if user picks band find band
        if (this.formValues.bandName) {
          const b = this.bands.filter((band) => {
            return band.bandName === this.formValues.bandName
          })

          if (this.formValues.timeStarts) {
            this.formValues.timeStarts = this.formValues.timeStarts += ':00.000'
          }
          const event = await this.$strapi.create('events', {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          })
          this.event = event
          await this.$strapi.update('bands', b[0].id, {
            events: [...b[0].events, event],
          })
        }
        // if user picks a venue
        if (this.formValues.bandName) {
          const b = this.bands.filter((band) => {
            return band.bandName === this.formValues.bandName
          })

          if (this.formValues.timeStarts) {
            this.formValues.timeStarts = this.formValues.timeStarts += ':00.000'
          }
          const event = await this.$strapi.create('events', {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          })
          this.event = event
          await this.$strapi.update('bands', b[0].id, {
            events: [...b[0].events, event],
          })
        }
        if (this.formValues.timeStarts) {
          this.formValues.timeStarts = this.formValues.timeStarts += ':00.000'
        }

        const event = await this.$strapi.create('events', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        this.event = event
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
        console.log(error, 'there was an error ')
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

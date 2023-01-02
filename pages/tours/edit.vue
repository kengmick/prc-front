<template>
  <div>
    <div v-if="tour" class="px-2 sm:conatiner mx-auto my-6 sm:w-1/2">
      <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
      <!-- <img
      id="barcode"
      src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&size=100x100"
      alt=""
      title="HELLO"
      width="50"
      height="50"
    /> -->
      <FormulateForm v-model="formValues" @submit="submitForm">
        <h1 class="main_red_text text-left text-3xl sm:w-4/5 mb-6">
          Edit Tour
        </h1>
        <FormulateInput
          name="title"
          label="Title"
          wrapper-class=" sm:w-4/5 mx-auto "
          element-class="w-full"
          errors-class="sm:w-4/5 "
          :value="tour.title"
        />
        <FormulateInput
          name="dateStart"
          type="date"
          label="Date Starts"
          wrapper-class=" sm:w-4/5 mx-auto "
          element-class="w-full"
          errors-class="sm:w-4/5 "
          :value="tour.dateStart"
          @change="log($event.target.value)"
        />
        <FormulateInput
          name="dateEnd"
          type="date"
          label="Date Ends"
          wrapper-class=" sm:w-4/5 mx-auto "
          element-class="w-full"
          errors-class="sm:w-4/5 "
          :value="tour.dateEnd"
          @change="log($event.target.value)"
        />

        <h2 class="text-left main_red_text text-2xl mb-10 mt-4">
          Bands On Tour
        </h2>
        <FormulateInput
          type="group"
          name="touringBands"
          :repeatable="true"
          label="Band Playing"
          add-label="+ Add bands"
          wrapper-class=" sm:w-4/5 mx-auto "
          element-class="w-full"
          errors-class="sm:w-4/5 "
        >
          <FormulateInput
            name="BandName"
            label="Add band name"
            wrapper-class=" sm:w-4/5 mx-auto "
            element-class="w-full"
            input-class="w-full"
            errors-class="sm:w-4/5 "
          />
        </FormulateInput>
        <div v-if="tour.touringPoster">
          <NuxtImg
            :src="tour.touringPoster.url"
            height="300"
            width="300"
            class="mx-auto"
          />
        </div>
        <h2 class="text-left main_red_text text-2xl mb-10 mt-4">
          Edit Tour Poster
        </h2>
        <FormulateInput
          type="image"
          name="touringPoster"
          label="Add Tour Poster"
          validation="mime:image/jpeg,image/png,image/gif"
          input-class="w-full sm:w-96 "
          wrapper-class=" sm:w-4/5 mx-auto "
          element-class="w-full"
          errors-class="sm:w-4/5 "
          @change="tourPosterFile = $event.target.files[0]"
        />
        <!-- Events  -->

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
      formValuesEvent: {},
      errorMessage: '',
      event: {},
      tour: null,
      created: false,
      tourPosterFile: '',
      tourPosterFinal: '',
      eventPosterFile: '',
      eventPosterFinal: '',
      userBands: {},
      end: '',
      bands: [],
      tourEvents: [],
      events: false,
      loading: false,
    }
  },
  async mounted() {
    try {
      const tour = await this.$strapi.findOne('tours', this.$route.query.tour)
      this.tour = tour
    } catch (error) {
      console.log(error)
    }

    try {
      const bands = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.bands = bands
      const o = {}
      bands.forEach((b) => {
        o[b.bandName] = b.bandName
      })
      this.userBands = o
    } catch (error) {
      this.userBands = null
      console.log(error)
    }
  },
  methods: {
    moment,
    log(val) {
      console.log(val)
    },

    async submitForm() {
      if (this.tourPosterFile) {
        try {
          const formData = new FormData()
          await formData.append('files', this.tourPosterFile)
          const [tourPosterFinal] = await this.$strapi.create(
            'upload',
            formData
          )
          this.tourPosterFinal = tourPosterFinal
          this.formValues.touringPoster = tourPosterFinal
          console.log(this.formValues, 'fdsfdsfdsfds')
        } catch (error) {
          this.loading = false
          this.errorMessage =
            'Sorry, we could not upload the tour poster ... please try again'
          console.log(error)
        }
      }
      try {
        const tour = await this.$strapi.update('tours', this.tour.id, {
          ...this.formValues,
        })
        this.tour = tour
        this.loading = false
      } catch (error) {
        this.loading = false
        this.errorMessage = 'Sorry, something went wrong ... please try again'
        console.log('there was a problem', error)
      }

      // after creation take user to band admin
      if (this.tour) {
        this.$router.push({
          path: '/tours/tourview',
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

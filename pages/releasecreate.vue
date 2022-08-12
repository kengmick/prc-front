<template>
  <div>
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
    <h1 class="main_red_text text-center">Create Release</h1>
    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <div class="flex-col sm:flex sm:flex-row">
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                type="text"
                name="title"
                label="Release Tile "
                placeholder="Title"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="history"
                type="textarea"
                label="history"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="date"
                type="date"
                label="Date Released"
                wrapper-class="sm:w-4/5 m-auto"
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
                @change="selectedBand = $event.target.value"
              />

              <FormulateInput
                name="link"
                label="link"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="image"
                type="image"
                label="Add Image"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="profileImg = $event.target.value"
              />
              <pre>{{ profileImg }}</pre>
            </div>
          </div>
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
      classified: {},
      profileImg: '',
      bands: [],
      names: [],
      distros: [],
      userBands: false,
      selectedBand: '',
      release: '',
    }
  },
  async mounted() {
    // get list for add to band option
    try {
      const bands = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.bands = bands
      const o = {}
      bands.forEach((b) => {
        o[b.id] = b.bandName
      })
      this.userBands = o
    } catch (error) {
      console.log('error in finding bands ', error)
    }
  },
  methods: {
    async submitForm() {
      if (this.profileImg) {
        try {
          const formData = new FormData()
          await formData.append('files', this.profileImg)
          const [image] = await this.$strapi.create('upload', formData)
          this.profileImg = image
          this.formValues.profileImg = image
        } catch (error) {
          console.log(error)
        }
        if (this.selectedBand) {
          const band = this.bands.filter((b) => {
            return b.id === this.selectedBand.id
          })
          try {
            const release = this.$strapi.create('releases', {
              ...this.formValues,
            })
            const updateBand = await this.$strapi.update(
              'bands',
              this.selectedBand.id,
              {
                releases: [...band.releases, release.id],
              }
            )
            console.log(release, updateBand)
          } catch (error) {}
        }
      }
      if (this.selectedBand) {
        const band = this.bands.filter((b) => {
          return b.id === this.selectedBand.id
        })
        try {
          const release = this.$strapi.create('releases', {
            ...this.formValues,
          })
          const updateBand = await this.$strapi.update(
            'bands',
            this.selectedBand.id,
            {
              releases: [...band.releases, release.id],
            }
          )
          console.log(release, updateBand)
        } catch (error) {}
      }
      try {
        this.release = await this.$strapi.create('releases', {
          ...this.formValues,
        })
        console.log(this.release, ' release ')
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
        console.log('there was a problem')
      }
      if (this.release) {
        this.$router.push({
          path: '/releaseview',
          query: { release: this.release.id },
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

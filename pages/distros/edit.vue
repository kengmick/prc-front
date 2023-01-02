<template>
  <div v-if="distro">
    <h1 class="text-center my-4">Create Your Distro/label</h1>
    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <div class="flex-col sm:flex sm:flex-row">
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                name="name"
                label="Distro Name"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                :value="distro.name"
              />

              <FormulateInput
                name="dateOpened"
                type="date"
                label="Date Started"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                :value="distro.dateOpened"
              />
              <FormulateInput
                name="contact"
                label="Contact?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                :value="distro.contact"
              />
            </div>
            <div class="w-full px-4 sm:w-1/2">
              <!-- Tier 2 contact list  -->
              <div v-if="acc < 2">
                <FormulateInput
                  name="link"
                  label="Add a Link"
                  placeholder="https://somelink.com"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                  :value="distro.link"
                />
              </div>

              <FormulateInput
                name="country"
                label="Country other than USA?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                :value="distro.country"
                @change="formValues.country = $event.target.value"
              />
              <FormulateInput
                name="city"
                label="City?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                :value="distro.city"
              />
              <FormulateInput
                v-if="
                  !formValues.country && formValues.coutry !== 'United States'
                "
                name="state"
                label="Home state?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                :value="distro.state"
              />
              <FormulateInput
                v-if="
                  !formValues.country || formValues.country === 'United States'
                "
                name="streetAddress"
                type="text"
                label="Street Address and Name"
                placeholder="5555 wolf ave"
                wrapper-class="sm:w-4/5 m-auto mb-4"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                :value="distro.streetAddress"
              />
            </div>
          </div>
          <section class="px-4 mt-10 sm:m-20">
            <!-- altContact and links -->

            <!-- <div v-if="acc === 2">
              <h2 class="my-4">Add Contacts</h2>
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
              </FormulateInput> -->

            <div v-if="acc === 2" class="w-full justify-center">
              <h3 class="mb-10 mt-4 text-3xl">Add Cover Image</h3>
              <FormulateInput
                type="image"
                name="distroImage"
                label="Select an image to upload"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                input-class="w-full sm:w-96 "
                wrapper-class="w-full sm:w-96 "
                element-class="w-full sm:w-96 "
                @change="profileImage = $event.target.files[0]"
              />
            </div>

            <h2
              v-if="acc === 2"
              class="text-center main_red_text text-2xl mb-10 mt-4"
            >
              Add Bio
            </h2>
            <div v-if="acc === 2" class="flex w-full justify-center">
              <FormulateInput
                name="description"
                type="textarea"
                label="History"
                input-class="w-full sm:w-96 h-72"
                wrapper-class="w-full sm:w-96 h-72"
                element-class="w-full sm:w-96 h-72"
                :value="distro.description"
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
      errorMessage: null,
      band: {},
      created: false,
      profileImage: '',
      image: '',
      showPosters: [],
      acc: 1,
      distro: null,
      loading: false,
    }
  },
  async mounted() {
    const user = await this.$strapi.findOne('users', this.$strapi.user.id)
    this.acc = user.acc
    this.distro = await this.$strapi.findOne(
      'record-labels',
      this.$route.query.distro
    )
  },
  methods: {
    async submitForm() {
      // uploading bandProfileImg
      this.loading = true
      // getting pictures uploaded

      if (this.profileImage) {
        try {
          console.log('profile image ')
          const formData = new FormData()
          await formData.append('files', this.profileImage)
          const [image] = await this.$strapi.create('upload', formData)
          this.image = image
          this.formValues.distroImage = image
          console.log(image)
        } catch (error) {
          this.formValues.distroImage = ''
          console.log(error)
          this.loading = false
          this.errorMessage =
            'Sorry .. we could not upload the cover image for the distro ... please try again'
        }
      }

      try {
        const distro = await this.$strapi.update(
          'record-labels',
          this.distro.id,
          {
            ...this.formValues,
          }
        )
        this.distro = distro
        this.loading = false
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
        console.log(error, 'creating band')
        this.loading = false
        this.errorMessage = 'Sorry .. something went wrong please try again'
      }
      // after creation take user to band admin
      if (this.distro) {
        this.$router.push({
          path: '/distros/distroview',
          query: { distro: this.distro.id },
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
